import * as React from 'react';
import { expect } from 'chai';
import { render } from '@testing-library/react';

import { styled } from '../../src/runtime';

describe('styled - runtime', () => {
  it('should return base classes when there are no variants or runtime props', async () => {
    const Component = styled('div')({
      classes: 'hello world',
    });
    const screen = render(<Component data-testid="component">Hello</Component>);
    const component = await screen.findByTestId('component');
    expect(component.className).to.equal('hello world');
  });

  it('should return base and variant classes as per prop value', async () => {
    const Component = styled('div')({
      classes: 'hello',
      defaultVariants: {
        variant: 'primary',
        size: 'medium',
      },
      variants: [
        {
          $$cls: 'v-primary',
          props: {
            variant: 'primary',
          },
        },
        {
          $$cls: 'v-secondary',
          props: {
            variant: 'secondary',
          },
        },
        {
          $$cls: 's-small',
          props: {
            size: 'small',
          },
        },
        {
          $$cls: 's-medium',
          props: {
            size: 'medium',
          },
        },
        {
          $$cls: 's-large',
          props: {
            size: 'large',
          },
        },
      ],
    }) as React.FC<
      { size?: string; variant?: string; as?: string } & React.JSX.IntrinsicElements['div']
    >;
    const screen = render(<Component data-testid="component">Hello</Component>);
    let component = await screen.findByTestId('component');
    expect(component.className).to.equal('hello v-primary s-medium');

    screen.rerender(
      <Component data-testid="component" size="medium">
        Hello
      </Component>,
    );
    expect(component.className).to.equal('hello v-primary s-medium');

    screen.rerender(
      <Component data-testid="component" size="small">
        Hello
      </Component>,
    );
    expect(component.className).to.equal('hello v-primary s-small');

    screen.rerender(
      <Component data-testid="component" variant="secondary">
        Hello
      </Component>,
    );
    expect(component.className).to.equal('hello v-secondary s-medium');

    screen.rerender(
      <Component data-testid="component" variant="secondary" size="large" data-red="">
        Hello
      </Component>,
    );
    expect(component.className).to.equal('hello v-secondary s-large');

    screen.rerender(
      // @ts-expect-error type is forwardable to button
      <Component as="button" data-testid="component" variant="secondary" size="large" type="button">
        Hello
      </Component>,
    );
    component = await screen.findByRole('button');
    expect(component.tagName).to.equal('BUTTON');
    expect(component.getAttribute('type')).to.equal('button');
  });

  it('default prop filtering for native html tag', async () => {
    const Link = styled('a')({
      classes: 'green',
    });
    const other = { m: [3], pt: [4] };

    const screen = render(
      <Link
        data-testid="component"
        // @ts-expect-error
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
        {...other}
      >
        hello world
      </Link>,
    );
    const component = await screen.findByTestId('component');
    expect(component.getAttribute('href')).to.equal('link');
    expect(component.getAttribute('aria-label')).to.equal('some label');
    expect(component.getAttribute('data-wow')).to.equal('value');
    expect(component.getAttribute('is')).to.equal('true');

    expect(component.hasAttribute('a')).to.equal(false);
    expect(component.hasAttribute('b')).to.equal(false);
    expect(component.hasAttribute('wow')).to.equal(false);
    expect(component.hasAttribute('prop')).to.equal(false);
    expect(component.hasAttribute('cool')).to.equal(false);
    expect(component.hasAttribute('filtering')).to.equal(false);
  });

  describe('as', () => {
    it("child's classes still propagate to its parent", () => {
      const StyledChild = styled('span')({
        classes: 'child',
      });

      const StyledParent = styled(StyledChild)({
        classes: 'parent',
      });

      const { getByTestId } = render(<StyledParent as="div" data-testid="component" />);
      expect(getByTestId('component').className).to.equal('child parent');
    });

    it('use component forward prop if provided `as` is a component', () => {
      const StyledDiv = styled('div')({
        classes: 'root',
      });

      function Component({ TagComponent = 'span', ...props }) {
        return <TagComponent {...props} />;
      }

      const { getByTestId } = render(
        // @ts-expect-error
        <StyledDiv as={Component} data-testid="component" TagComponent="button" disabled />,
      );

      expect(getByTestId('component').tagName).to.equal('BUTTON');
    });
  });
});
