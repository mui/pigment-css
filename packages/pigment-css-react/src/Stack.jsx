import clsx from 'clsx';
import PropTypes from 'prop-types';
import * as React from 'react';

import { stackAtomics } from './baseAtomics';

/**
 * Return an array with the separator React element interspersed between
 * each React node of the input children.
 *
 * > joinChildren([1,2,3], 0)
 * [1,0,2,0,3]
 *
 * @param {React.ReactNode} children
 * @param {React.ReactElement} separator
 * @returns {React.ReactNode[]}
 */
function joinChildren(children, separator) {
  const childrenArray = React.Children.toArray(children).filter(Boolean);

  return childrenArray.reduce((output, child, index) => {
    output.push(child);

    if (index < childrenArray.length - 1) {
      output.push(React.cloneElement(separator, { key: `separator-${index}` }));
    }

    return output;
  }, []);
}

const Stack = React.forwardRef(function Stack(
  {
    children,
    spacing = 0,
    style,
    className,
    divider,
    display = 'flex',
    component = 'div',
    direction = 'column',
    alignItems,
    justifyContent,
    ...rest
  },
  ref,
) {
  const stackAtomicsObj = {
    display,
    direction,
  };
  if (spacing) {
    stackAtomicsObj.spacing = spacing;
  }
  if (alignItems) {
    stackAtomicsObj.alignItems = alignItems;
  }
  if (justifyContent) {
    stackAtomicsObj.justifyContent = justifyContent;
  }
  const stackClasses = stackAtomics(stackAtomicsObj);
  const Component = component;
  return (
    <Component
      ref={ref}
      className={clsx(stackClasses.className, className)}
      style={{ ...style, ...stackClasses.style }}
      {...rest}
    >
      {divider ? joinChildren(children, divider) : children}
    </Component>
  );
});

process.env.NODE_ENV !== 'production'
  ? (Stack.propTypes /* remove-proptypes */ = {
      // ┌────────────────────────────── Warning ──────────────────────────────┐
      // │ These PropTypes are generated from the TypeScript type definitions. │
      // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
      // └─────────────────────────────────────────────────────────────────────┘
      /**
       * @ignore
       */
      alignItems: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
        PropTypes.oneOf([
          'center',
          'end',
          'flex-end',
          'flex-start',
          'self-end',
          'self-start',
          'start',
          'baseline',
          'normal',
          'stretch',
        ]),
        PropTypes.arrayOf(
          PropTypes.oneOf([
            'center',
            'end',
            'flex-end',
            'flex-start',
            'self-end',
            'self-start',
            'start',
            'baseline',
            'normal',
            'stretch',
          ]),
        ),
        PropTypes.object,
      ]),
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
       * @ignore
       */
      direction: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
        PropTypes.oneOf(['column', 'column-reverse', 'row', 'row-reverse']),
        PropTypes.arrayOf(PropTypes.oneOf(['column', 'column-reverse', 'row', 'row-reverse'])),
        PropTypes.object,
      ]),
      /**
       * @ignore
       */
      display: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
        PropTypes.oneOf(['flex', 'inline-flex']),
        PropTypes.arrayOf(PropTypes.oneOf(['flex', 'inline-flex']).isRequired),
        PropTypes.object,
      ]),
      /**
       * @ignore
       */
      divider: PropTypes.node,
      /**
       * @ignore
       */
      justifyContent: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
        PropTypes.oneOf([
          'end',
          'start',
          'flex-end',
          'flex-start',
          'center',
          'space-between',
          'space-around',
          'space-evenly',
        ]),
        PropTypes.arrayOf(
          PropTypes.oneOf([
            'end',
            'start',
            'flex-end',
            'flex-start',
            'center',
            'space-between',
            'space-around',
            'space-evenly',
          ]),
        ),
        PropTypes.object,
      ]),
      /**
       * @ignore
       */
      spacing: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
        PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired),
        PropTypes.number,
        PropTypes.object,
        PropTypes.string,
      ]),
    })
  : void 0;

Stack.displayName = 'Stack';

export default Stack;
