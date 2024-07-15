/* eslint-disable react/jsx-filename-extension */
import clsx from 'clsx';
import PropTypes from 'prop-types';
import * as React from 'react';
import { generateAtomics } from './generateAtomics';
import css from './css';

const stackAtomics = generateAtomics(({ theme }) => {
  const conditions = {};
  Object.entries(theme.breakpoints.values)
    .sort((a, b) => a[1] - b[1])
    .forEach(([breakpoint, value]) => {
      conditions[breakpoint] = `@media (min-width: ${value}${theme.breakpoints.unit ?? 'px'})`;
    });
  return {
    conditions,
    defaultCondition: theme.breakpoints?.keys?.[0],
    properties: {
      flexDirection: ['column', 'column-reverse', 'row', 'row-reverse'],
      gap: ['--Stack-gap'],
    },
    shorthands: {
      direction: ['flexDirection'],
      spacing: ['gap'],
    },
    multipliers: {
      gap: Array.isArray(theme.vars?.spacing) ? theme.vars.spacing[0] : theme.vars?.spacing,
    },
  };
});

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
    component = 'div',
    direction = 'column',
    ...other
  },
  ref,
) {
  const stackAtomicsObj = {
    direction,
    spacing,
  };
  const stackClasses = stackAtomics(stackAtomicsObj);
  const Component = component;
  return (
    <Component
      ref={ref}
      className={clsx(
        css({
          display: 'flex',
        }),
        stackClasses.className,
        className,
      )}
      style={{ ...style, ...stackClasses.style }}
      {...other}
    >
      {divider ? joinChildren(children, divider) : children}
    </Component>
  );
});

if (process.env.NODE_ENV !== 'production') {
  Stack.propTypes /* remove-proptypes */ = {
    // ┌────────────────────────────── Warning ──────────────────────────────┐
    // │ These PropTypes are generated from the TypeScript type definitions. │
    // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
    // └─────────────────────────────────────────────────────────────────────┘
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
    divider: PropTypes.node,
    /**
     * @ignore
     */
    spacing: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
      PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired),
      PropTypes.number,
      PropTypes.object,
      PropTypes.string,
    ]),
    /**
     * @ignore
     */
    style: PropTypes.shape(),
  };
}

if (Stack) {
  Stack.displayName = 'Stack';
}

export default Stack;
