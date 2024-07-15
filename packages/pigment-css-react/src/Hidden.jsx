/* eslint-disable react/jsx-filename-extension */
import * as React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { generateAtomics } from './generateAtomics';

const hiddenAtomics = generateAtomics(({ theme }) => {
  const conditions = {};

  for (let i = 0; i < theme.breakpoints.keys.length; i += 1) {
    const breakpoint = theme.breakpoints.keys[i];
    conditions[`${theme.breakpoints.keys[i]}Only`] = theme.breakpoints.only(breakpoint);
    conditions[`${theme.breakpoints.keys[i]}Up`] = theme.breakpoints.up(breakpoint);
    conditions[`${theme.breakpoints.keys[i]}Down`] = theme.breakpoints.down(breakpoint);
  }

  return {
    conditions,
    properties: {
      display: ['none'],
    },
  };
});

const Hidden = React.forwardRef(function Hidden(
  { className, component = 'div', style, ...props },
  ref,
) {
  const other = {};
  const breakpointProps = {};
  Object.keys(props).forEach((key) => {
    if (key.endsWith('Up') || key.endsWith('Down')) {
      breakpointProps[key] = 'none';
    } else if (key === 'only') {
      if (typeof props[key] === 'string') {
        breakpointProps[`${props[key]}Only`] = 'none';
      }
      if (Array.isArray(props[key])) {
        props[key].forEach((val) => {
          breakpointProps[`${val}Only`] = 'none';
        });
      }
    } else {
      other[key] = props[key];
    }
  });
  const stackClasses = hiddenAtomics({ display: breakpointProps });
  const Component = component;
  return (
    <Component
      ref={ref}
      className={clsx(stackClasses.className, className)}
      style={{ ...style, ...stackClasses.style }}
      {...other}
    />
  );
});

if (process.env.NODE_ENV !== 'production') {
  Hidden.propTypes = {
    /**
     * The content of the component.
     */
    children: PropTypes.node,
    /**
     * @ignore
     */
    className: PropTypes.string,
    /**
     * The component used for the root node.
     * Either a string to use a HTML element or a component.
     */
    component: PropTypes.elementType,
    /**
     * If `true`, screens this size and down are hidden.
     */
    lgDown: PropTypes.bool,
    /**
     * If `true`, screens this size and up are hidden.
     */
    lgUp: PropTypes.bool,
    /**
     * If `true`, screens this size and down are hidden.
     */
    mdDown: PropTypes.bool,
    /**
     * If `true`, screens this size and up are hidden.
     */
    mdUp: PropTypes.bool,
    /**
     * Hide the given breakpoint(s).
     */
    only: PropTypes.oneOfType([
      PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
      PropTypes.arrayOf(PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl'])),
    ]),
    /**
     * If `true`, screens this size and down are hidden.
     */
    smDown: PropTypes.bool,
    /**
     * If `true`, screens this size and up are hidden.
     */
    smUp: PropTypes.bool,
    /**
     * @ignore
     */
    style: PropTypes.object,
    /**
     * If `true`, screens this size and down are hidden.
     */
    xlDown: PropTypes.bool,
    /**
     * If `true`, screens this size and up are hidden.
     */
    xlUp: PropTypes.bool,
    /**
     * If `true`, screens this size and down are hidden.
     */
    xsDown: PropTypes.bool,
    /**
     * If `true`, screens this size and up are hidden.
     */
    xsUp: PropTypes.bool,
  };
}

export default Hidden;
