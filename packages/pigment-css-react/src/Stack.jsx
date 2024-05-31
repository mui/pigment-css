import clsx from 'clsx';
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

Stack.displayName = 'Stack';

export default Stack;
