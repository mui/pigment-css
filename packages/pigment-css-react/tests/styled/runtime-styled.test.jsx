import * as React from 'react';
import { render } from '@testing-library/react';
import { expect } from 'vitest';
import { styled } from '../../src';

describe('props filtering', () => {
  it('composes shouldForwardProp on composed styled components', () => {
    const StyledDiv = styled('div', {
      shouldForwardProp: (prop) => prop !== 'foo',
    })();

    const ComposedDiv = styled(StyledDiv, {
      shouldForwardProp: (prop) => prop !== 'bar',
    })();

    const { container } = render(<ComposedDiv foo bar xyz="true" />);

    expect(container.firstChild).not.toHaveAttribute('foo');
    expect(container.firstChild).not.toHaveAttribute('bar');
    expect(container.firstChild).toHaveAttribute('xyz', 'true');
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
    expect(container.firstChild).not.toHaveAttribute('color');
    expect(container.firstChild).toHaveAttribute('width', '100px');
    expect(container.firstChild).toHaveAttribute('height', '100px');
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
    expect(container.firstChild).toHaveAttribute('href', 'link');
    expect(container.firstChild).toHaveAttribute('aria-label', 'some label');
    expect(container.firstChild).toHaveAttribute('data-wow', 'value');
    expect(container.firstChild).toHaveAttribute('is', 'true');

    expect(container.firstChild).not.toHaveAttribute('a');
    expect(container.firstChild).not.toHaveAttribute('b');
    expect(container.firstChild).not.toHaveAttribute('wow');
    expect(container.firstChild).not.toHaveAttribute('prop');
    expect(container.firstChild).not.toHaveAttribute('filtering');
    expect(container.firstChild).not.toHaveAttribute('cool');
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

    expect(container.firstChild).toHaveAttribute('href', 'link');
    expect(container.firstChild).toHaveAttribute('aria-label', 'some label');
    expect(container.firstChild).toHaveAttribute('data-wow', 'value');
    expect(container.firstChild).toHaveAttribute('is', 'true');
    expect(container.firstChild).toHaveAttribute('a', 'true');
    expect(container.firstChild).toHaveAttribute('b', 'true');
    expect(container.firstChild).toHaveAttribute('wow', 'true');
    expect(container.firstChild).toHaveAttribute('prop', 'true');
    expect(container.firstChild).toHaveAttribute('filtering', 'true');
    expect(container.firstChild).toHaveAttribute('cool', 'true');
  });

  describe('ownerState prop', () => {
    it('[HTML tag] does not forward `ownerState` by default', () => {
      const StyledDiv = styled('div')();

      const { container } = render(<StyledDiv ownerState={{ color: 'red' }} />);
      expect(container.firstChild).not.toHaveAttribute('ownerState');
    });

    it('does not forward `ownerState` to other React component', () => {
      function InnerComponent(props) {
        const { ownerState } = props;
        return <div {...props} data-ownerstate={!!ownerState} />;
      }
      const StyledDiv = styled(InnerComponent)();

      const { container } = render(<StyledDiv ownerState={{ color: 'red' }} />);
      expect(container.firstChild).not.toHaveAttribute('ownerState');
      expect(container.firstChild).toHaveAttribute('data-ownerstate', 'false');
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
      expect(container.firstChild).toHaveClass('div1-secondary');
      expect(container.firstChild).toHaveClass('div2-secondary');
    });
  });

  describe('classes prop', () => {
    it('does not forward `classes` by default', () => {
      const StyledDiv = styled('div')();

      const { container } = render(<StyledDiv classes={{ root: 'root-123' }} />);
      expect(container.firstChild).not.toHaveAttribute('classes');
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
      expect(container.firstChild).not.toHaveAttribute('classes');
      expect(container.firstChild).not.toHaveClass('root-123');
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
      expect(container.firstChild).toHaveClass('root-123');
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
      expect(container.firstChild).toHaveClass('child');
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
      expect(container.firstChild).toHaveClass('multiline');
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
      expect(container.firstChild).toHaveStyle({ '--foo': '300px' });
    });

    it('use component forward prop if provided `as` is a component', () => {
      const StyledDiv = styled('div')({
        classes: ['root'],
      });

      function Component({ TagComponent = 'span', ...props }) {
        return <TagComponent {...props} />;
      }

      const { container } = render(<StyledDiv as={Component} TagComponent="button" disabled />);

      expect(container.firstChild.tagName).toEqual('BUTTON');
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
      expect(container.firstChild.tagName).toEqual('DIV');
      expect(container.firstChild).toHaveClass('InputBase-root', 'Input-root');

      expect(container.firstChild.firstChild.tagName).toEqual('SELECT');
      expect(container.firstChild.firstChild).toHaveClass('InputBase-input', 'Input-input');
    });
  });
});
