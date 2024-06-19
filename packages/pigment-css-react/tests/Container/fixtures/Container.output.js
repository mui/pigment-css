import _default from '@pigment-css/react';
import _theme from '@pigment-css/react/theme';
import * as React from 'react';
import PropTypes from 'prop-types';
const ContainerRoot = /*#__PURE__*/ _default('div', {
  name: 'MuiContainer',
  slot: 'Root',
})({
  classes: ['c12mgz3n'],
  variants: [
    {
      props: (props) => !props.disableGutters,
      className: 'c12mgz3n-1',
    },
    {
      props: {
        fixed: true,
      },
      className: 'c12mgz3n-2',
    },
    {
      props: {
        maxWidth: 'xs',
      },
      className: 'c12mgz3n-3',
    },
    {
      props: {
        maxWidth: 'sm',
      },
      className: 'c12mgz3n-4',
    },
    {
      props: {
        maxWidth: 'md',
      },
      className: 'c12mgz3n-5',
    },
    {
      props: {
        maxWidth: 'lg',
      },
      className: 'c12mgz3n-6',
    },
    {
      props: {
        maxWidth: 'xl',
      },
      className: 'c12mgz3n-7',
    },
  ],
});
const Container = React.forwardRef(function Container(props, ref) {
  const {
    className,
    component = 'div',
    disableGutters = false,
    fixed = false,
    maxWidth = 'lg',
    // classes: classesProp,
    ...other
  } = props;
  const ownerState = {
    ...props,
    component,
    disableGutters,
    fixed,
    maxWidth,
  };
  return (
    // @ts-ignore theme is injected by the styled util
    <ContainerRoot
      as={component}
      // @ts-ignore module augmentation fails if custom breakpoints are used
      ownerState={ownerState}
      className={className}
      ref={ref}
      {...other}
    />
  );
});
process.env.NODE_ENV !== 'production'
  ? (Container.propTypes /* remove-proptypes */ = {
      // ┌────────────────────────────── Warning ──────────────────────────────┐
      // │ These PropTypes are generated from the TypeScript type definitions. │
      // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
      // └─────────────────────────────────────────────────────────────────────┘
      /**
       * The content of the component.
       */
      children: PropTypes.node,
      /**
       * The component used for the root node.
       * Either a string to use a HTML element or a component.
       */
      component: PropTypes.elementType,
      /**
       * If `true`, the left and right padding is removed.
       * @default false
       */
      disableGutters: PropTypes.bool,
      /**
       * Set the max-width to match the min-width of the current breakpoint.
       * This is useful if you'd prefer to design for a fixed set of sizes
       * instead of trying to accommodate a fully fluid viewport.
       * It's fluid by default.
       * @default false
       */
      fixed: PropTypes.bool,
      /**
       * Determine the max-width of the container.
       * The container width grows with the size of the screen.
       * Set to `false` to disable `maxWidth`.
       * @default 'lg'
       */
      maxWidth: PropTypes.oneOf(['lg', 'md', 'sm', 'xl', 'xs', false]),
    })
  : void 0;
export default Container;
