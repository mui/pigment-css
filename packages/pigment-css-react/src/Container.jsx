import * as React from 'react';
import PropTypes from 'prop-types';
import styled from './styled';

const ContainerRoot = styled('div', {
  name: 'MuiContainer',
  slot: 'Root',
})(({ theme }) => ({
  width: '100%',
  marginLeft: 'auto',
  boxSizing: 'border-box',
  marginRight: 'auto',
  variants: [
    {
      props: (props) => !props.disableGutters,
      style: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
          paddingLeft: theme.spacing(3),
          paddingRight: theme.spacing(3),
        },
      },
    },
    {
      props: {
        fixed: true,
      },
      style: Object.keys(theme.breakpoints.values).reduce((acc, breakpointValueKey) => {
        const breakpoint = breakpointValueKey;
        const value = theme.breakpoints.values[breakpoint];

        if (value !== 0) {
          // @ts-ignore
          acc[theme.breakpoints.up(breakpoint)] = {
            maxWidth: `${value}${theme.breakpoints.unit}`,
          };
        }
        return acc;
      }, {}),
    },
    {
      props: {
        maxWidth: 'xs',
      },
      style: {
        [theme.breakpoints.up('xs')]: {
          maxWidth: Math.max(theme.breakpoints.values.xs, 444),
        },
      },
    },
    ...theme.breakpoints.keys
      .filter((breakpoint) => breakpoint && breakpoint !== 'xs')
      .map((breakpoint) => {
        return {
          props: {
            maxWidth: breakpoint,
          },
          style: {
            [theme.breakpoints.up(breakpoint)]: {
              // @ts-ignore module augmentation fails if custom breakpoints are used
              maxWidth: `${theme.breakpoints.values[breakpoint]}${theme.breakpoints.unit}`,
            },
          },
        };
      })
      .filter(Boolean),
  ],
}));

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
