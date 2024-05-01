import * as React from 'react';
import { expect } from 'chai';
import { createRenderer } from '@mui/internal-test-utils';
import styled from '../../src/styled';

describe('props filtering', () => {
  const { render } = createRenderer();

  it('composes shouldForwardProp on composed styled components', () => {
    const StyledDiv = styled('div', {
      shouldForwardProp: (prop) => prop !== 'foo',
    })();

    const ComposedDiv = styled(StyledDiv, {
      shouldForwardProp: (prop) => prop !== 'bar',
    })();

    const { container } = render(<ComposedDiv foo bar xyz="true" />);

    expect(container.firstChild).to.not.have.attribute('foo');
    expect(container.firstChild).to.not.have.attribute('bar');
    expect(container.firstChild).to.have.attribute('xyz', 'true');
  });

  it('custom shouldForwardProp works', () => {
    function Svg(props) {
      return (
        <svg {...props}>
          <rect x="10" y="10" height="100" width="100" style={{ stroke: '#ff0000' }} />
        </svg>
      );
    }

    const StyledSvg = styled(Svg, {
      shouldForwardProp: (prop) => ['className', 'width', 'height'].indexOf(prop) !== -1,
    })`
      &,
      & * {
        fill: ${({ color }) => color};
      }
    `;

    const { container } = render(<StyledSvg color="#0000ff" width="100px" height="100px" />);
    expect(container.firstChild).to.not.have.attribute('color');
    expect(container.firstChild).to.have.attribute('width', '100px');
    expect(container.firstChild).to.have.attribute('height', '100px');
  });

  it('default prop filtering for native html tag', () => {
    const Link = styled('a')`
      color: green;
    `;
    const rest = { m: [3], pt: [4] };

    const { container } = render(
      <Link
        a="true"
        b="true"
        wow="true"
        prop="true"
        filtering="true"
        is="true"
        cool="true"
        aria-label="some label"
        data-wow="value"
        href="link"
        {...rest}
      >
        hello world
      </Link>,
    );
    expect(container.firstChild).to.have.attribute('href', 'link');
    expect(container.firstChild).to.have.attribute('aria-label', 'some label');
    expect(container.firstChild).to.have.attribute('data-wow', 'value');
    expect(container.firstChild).to.have.attribute('is', 'true');

    expect(container.firstChild).not.to.have.attribute('a');
    expect(container.firstChild).not.to.have.attribute('b');
    expect(container.firstChild).not.to.have.attribute('wow');
    expect(container.firstChild).not.to.have.attribute('prop');
    expect(container.firstChild).not.to.have.attribute('filtering');
    expect(container.firstChild).not.to.have.attribute('cool');
  });

  it('no prop filtering on non string tags', () => {
    // eslint-disable-next-line jsx-a11y/anchor-has-content
    const Link = styled((props) => <a {...props} />)`
      color: green;
    `;

    const { container } = render(
      <Link
        a="true"
        b="true"
        wow="true"
        prop="true"
        filtering="true"
        is="true"
        cool="true"
        aria-label="some label"
        data-wow="value"
        href="link"
      >
        hello world
      </Link>,
    );

    expect(container.firstChild).to.have.attribute('href', 'link');
    expect(container.firstChild).to.have.attribute('aria-label', 'some label');
    expect(container.firstChild).to.have.attribute('data-wow', 'value');
    expect(container.firstChild).to.have.attribute('is', 'true');
    expect(container.firstChild).to.have.attribute('a', 'true');
    expect(container.firstChild).to.have.attribute('b', 'true');
    expect(container.firstChild).to.have.attribute('wow', 'true');
    expect(container.firstChild).to.have.attribute('prop', 'true');
    expect(container.firstChild).to.have.attribute('filtering', 'true');
    expect(container.firstChild).to.have.attribute('cool', 'true');
  });

  describe('ownerState prop', () => {
    it('[HTML tag] does not forward `ownerState` by default', () => {
      const StyledDiv = styled('div')();

      const { container } = render(<StyledDiv ownerState={{ color: 'red' }} />);
      expect(container.firstChild).not.to.have.attribute('ownerState');
    });

    it('does not forward `ownerState` to other React component', () => {
      function InnerComponent(props) {
        const { ownerState } = props;
        return <div {...props} data-ownerstate={!!ownerState} />;
      }
      const StyledDiv = styled(InnerComponent)();

      const { container } = render(<StyledDiv ownerState={{ color: 'red' }} />);
      expect(container.firstChild).not.to.have.attribute('ownerState');
      expect(container.firstChild).to.have.attribute('data-ownerstate', 'false');
    });

    it('forward `ownerState` to inherited styled component', () => {
      const StyledDiv = styled('div')({
        classes: ['div1'],
        variants: [
          {
            props: ({ ownerState }) => ownerState.color === 'secondary',
            className: 'div1-secondary',
          },
        ],
      });

      const StyledDiv2 = styled(StyledDiv)({
        classes: ['div2'],
        variants: [
          {
            props: ({ ownerState }) => ownerState.color === 'secondary',
            className: 'div2-secondary',
          },
        ],
      });

      const { container } = render(<StyledDiv2 ownerState={{ color: 'secondary' }} />);
      expect(container.firstChild).to.have.class('div1-secondary');
      expect(container.firstChild).to.have.class('div2-secondary');
    });
  });

  describe('classes prop', () => {
    it('does not forward `classes` by default', () => {
      const StyledDiv = styled('div')();

      const { container } = render(<StyledDiv classes={{ root: 'root-123' }} />);
      expect(container.firstChild).not.to.have.attribute('classes');
    });

    it('does not forward `classes` for the root slot to other React component', () => {
      function InnerComponent(props) {
        const { classes = {} } = props;
        return <div {...props} className={classes.root} />;
      }
      const StyledDiv = styled(InnerComponent, {
        name: 'Div',
        slot: 'root',
      })();

      const { container } = render(<StyledDiv classes={{ root: 'root-123' }} />);
      expect(container.firstChild).not.to.have.attribute('classes');
      expect(container.firstChild).not.to.have.class('root-123');
    });

    it('forward `classes` for the root slot by a custom shouldForwardProp', () => {
      function ButtonBase(props) {
        const { classes = {} } = props;
        return <div {...props} className={classes.root} />;
      }
      const ButtonRoot = styled(ButtonBase, {
        name: 'Div',
        slot: 'root',
        shouldForwardProp: (prop) => prop === 'classes',
      })();

      const { container } = render(<ButtonRoot classes={{ root: 'root-123' }} />);
      expect(container.firstChild).to.have.class('root-123');
    });
  });

  describe('as', () => {
    it("child's classes still propagate to its parent", () => {
      const StyledChild = styled('span')({
        classes: ['child'],
      });

      const StyledParent = styled(StyledChild)({
        classes: ['parent'],
      });

      const { container } = render(<StyledParent as="div" />);
      expect(container.firstChild).to.have.class('child');
    });

    it("child's variants still propagate to its parent", () => {
      const StyledChild = styled('span')({
        classes: ['child'],
        variants: [
          {
            props: ({ ownerState }) => ownerState.multiline,
            className: 'multiline',
          },
        ],
      });

      const StyledParent = styled(StyledChild)({
        classes: ['parent'],
      });

      const { container } = render(<StyledParent as="div" ownerState={{ multiline: true }} />);
      expect(container.firstChild).to.have.class('multiline');
    });

    it("child's vars still propagate to its parent", () => {
      const StyledChild = styled('span')({
        classes: ['child'],
        vars: {
          foo: [(props) => props.ownerState.width, false],
        },
      });

      const StyledParent = styled(StyledChild)({
        classes: ['parent'],
      });

      const { container } = render(<StyledParent as="div" ownerState={{ width: 300 }} />);
      expect(container.firstChild).to.have.style('--foo', '300px');
    });

    it('use component forward prop if provided `as` is a component', () => {
      const StyledDiv = styled('div')({
        classes: ['root'],
      });

      function Component({ TagComponent = 'span', ...props }) {
        return <TagComponent {...props} />;
      }

      const { container } = render(<StyledDiv as={Component} TagComponent="button" disabled />);

      expect(container.firstChild).to.have.tagName('button');
    });

    it('should forward `as` prop', () => {
      // The components below is a simplified version of the `NativeSelect` component from Material UI.

      const InputBaseRoot = styled('div', { name: 'MuiInputBase', slot: 'Root' })({
        classes: ['InputBase-root'],
      });

      const InputBaseInput = styled('input', { name: 'MuiInputBase', slot: 'Input' })({
        classes: ['InputBase-input'],
      });

      function InputBase({
        inputComponent = 'input',
        slots = {},
        slotProps = {},
        inputProps: inputPropsProp = {},
      }) {
        const RootSlot = slots.root || InputBaseRoot;
        const rootProps = slotProps.root || {};

        const InputComponent = inputComponent;

        const InputSlot = slots.input || InputBaseInput;
        const inputProps = { ...inputPropsProp, ...slotProps.input };
        return (
          <RootSlot
            {...rootProps}
            {...(typeof Root !== 'string' && {
              ownerState: rootProps.ownerState,
            })}
          >
            <InputSlot
              {...inputProps}
              {...(typeof Input !== 'string' && {
                as: InputComponent,
                ownerState: inputProps.ownerState,
              })}
            />
          </RootSlot>
        );
      }

      const InputRoot = styled(InputBaseRoot, { name: 'MuiInput', slot: 'Root' })({
        classes: ['Input-root'],
      });
      const InputInput = styled(InputBaseInput, { name: 'MuiInput', slot: 'Input' })({
        classes: ['Input-input'],
      });
      function Input({
        inputComponent = 'input',
        multiline = false,
        slotProps,
        slots = {},
        type,
        ...other
      }) {
        const RootSlot = slots.root ?? InputRoot;
        const InputSlot = slots.input ?? InputInput;
        return (
          <InputBase
            slots={{ root: RootSlot, input: InputSlot }}
            slotProps={slotProps}
            inputComponent={inputComponent}
            multiline={multiline}
            type={type}
            {...other}
          />
        );
      }

      const defaultInput = <Input />;
      const NativeSelectSelect = styled('select', {
        name: 'MuiNativeSelect',
        slot: 'Select',
      })({
        classes: ['NativeSelect-select'],
      });
      function NativeSelectInput(props) {
        const { className, disabled, error, variant = 'standard', ...other } = props;

        const ownerState = {
          ...props,
          disabled,
          variant,
          error,
        };

        return (
          <NativeSelectSelect
            ownerState={ownerState}
            className={className}
            disabled={disabled}
            {...other}
          />
        );
      }
      function NativeSelect({ className, children, input = defaultInput, inputProps, ...other }) {
        return React.cloneElement(input, {
          inputComponent: NativeSelectInput,
          inputProps: {
            children,
            type: undefined, // We render a select. We can ignore the type provided by the `Input`.
            ...inputProps,
            ...(input ? input.props.inputProps : {}),
          },
          ...other,
          className: `${input.props.className} ${className}`,
        });
      }

      const { container } = render(
        <NativeSelect>
          <option value="foo">Foo</option>
          <option value="bar">Bar</option>
        </NativeSelect>,
      );
      expect(container.firstChild).to.have.tagName('div');
      expect(container.firstChild).to.have.class('InputBase-root', 'Input-root');

      expect(container.firstChild.firstChild).to.have.tagName('select');
      expect(container.firstChild.firstChild).to.have.class('InputBase-input', 'Input-input');
    });
  });
});
