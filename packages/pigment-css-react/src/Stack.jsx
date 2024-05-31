import clsx from 'clsx';
import * as React from 'react';

import { stackAtomics } from './baseAtomics';

const Stack = React.forwardRef(function Stack(
  {
    children,
    spacing = 0,
    style,
    className,
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
      {children}
    </Component>
  );
});

Stack.displayName = 'Stack';

export default Stack;
