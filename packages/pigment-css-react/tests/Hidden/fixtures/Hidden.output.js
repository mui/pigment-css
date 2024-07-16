import { atomics as _atomics } from '@pigment-css/react';
/* eslint-disable react/jsx-filename-extension */
import * as React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
const hiddenAtomics = /*#__PURE__*/ _atomics({
  styles: {
    display: {
      none: {
        xsOnly: 'hccfrvp1',
        xsUp: 'hccfrvp2',
        xsDown: 'hccfrvp3',
        smOnly: 'hccfrvp4',
        smUp: 'hccfrvp5',
        smDown: 'hccfrvp6',
        mdOnly: 'hccfrvp7',
        mdUp: 'hccfrvp8',
        mdDown: 'hccfrvp9',
        lgOnly: 'hccfrvp10',
        lgUp: 'hccfrvp11',
        lgDown: 'hccfrvp12',
        xlOnly: 'hccfrvp13',
        xlUp: 'hccfrvp14',
        xlDown: 'hccfrvp15',
        uwOnly: 'hccfrvp16',
        uwUp: 'hccfrvp17',
        uwDown: 'hccfrvp18',
      },
    },
  },
  shorthands: {},
  conditions: [
    'xsOnly',
    'xsUp',
    'xsDown',
    'smOnly',
    'smUp',
    'smDown',
    'mdOnly',
    'mdUp',
    'mdDown',
    'lgOnly',
    'lgUp',
    'lgDown',
    'xlOnly',
    'xlUp',
    'xlDown',
    'uwOnly',
    'uwUp',
    'uwDown',
  ],
  defaultCondition: undefined,
  unitless: [],
  multipliers: {},
  inlineGetters: {},
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
  const stackClasses = hiddenAtomics({
    display: breakpointProps,
  });
  const Component = component;
  return (
    <Component
      ref={ref}
      className={clsx(stackClasses.className, className)}
      style={{
        ...style,
        ...stackClasses.style,
      }}
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
      PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl', 'uw']),
      PropTypes.arrayOf(PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl', 'uw'])),
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
    uwDown: PropTypes.bool,
    /**
     * If `true`, screens this size and up are hidden.
     */
    uwUp: PropTypes.bool,
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
