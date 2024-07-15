/* eslint-disable react/prop-types */
import * as React from 'react';
import PropTypes from 'prop-types';

const Box = React.forwardRef(
  (
    {
      as = 'div',
      // Added to support compatibility with @mui/system
      component,
      /**
       * The type of the transformed sx prop is either a
       * "string" if the css passed was fully static or an
       * object with the following shape:
       * {
       *  className: string,
       *  vars: Record<string, [string | number, boolean]>
       * }
       */
      sx,
      className,
      style,
      ...other
    },
    ref,
  ) => {
    const Component = component ?? as;
    // eslint-disable-next-line react/prop-types
    const sxClass = typeof sx === 'string' ? sx : sx?.className;
    const classes = [className, sxClass].filter(Boolean).join(' ');
    // eslint-disable-next-line react/prop-types
    const sxVars = sx && typeof sx !== 'string' ? sx?.vars : {};
    const varStyles = {};

    if (sxVars) {
      Object.entries(sxVars).forEach(([cssVariable, [value, isUnitLess]]) => {
        if (typeof value === 'string' || isUnitLess) {
          varStyles[`--${cssVariable}`] = value;
        } else {
          varStyles[`--${cssVariable}`] = `${value}px`;
        }
      });
    }

    const styles = {
      ...style,
      ...varStyles,
    };

    // eslint-disable-next-line react/jsx-filename-extension
    return <Component ref={ref} className={classes} style={styles} {...other} />;
  },
);

process.env.NODE_ENV !== 'production'
  ? (Box.propTypes /* remove-proptypes */ = {
      // ┌────────────────────────────── Warning ──────────────────────────────┐
      // │ These PropTypes are generated from the TypeScript type definitions. │
      // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
      // └─────────────────────────────────────────────────────────────────────┘
      /**
       * The component used for the root node.
       * Either a string to use a HTML element or a component.
       * Replacement for the emotion's `as` prop.
       */
      as: PropTypes.elementType,
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
       * The style extension prop that allows defining system overrides as well as additional CSS styles.
       */
      sx: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    })
  : void 0;

export default Box;
