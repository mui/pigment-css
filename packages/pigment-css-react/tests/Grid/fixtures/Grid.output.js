import { styled as _styled } from '@pigment-css/react';
import _theme from '@pigment-css/react/theme';
import { atomics as _atomics } from '@pigment-css/react';
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable react/jsx-filename-extension */
import clsx from 'clsx';
import PropTypes from 'prop-types';
import * as React from 'react';
function isGridComponent(element) {
  // For server components `muiName` is avaialble in element.type._payload.value.muiName
  // relevant info - https://github.com/facebook/react/blob/2807d781a08db8e9873687fccc25c0f12b4fb3d4/packages/react/src/ReactLazy.js#L45
  // eslint-disable-next-line no-underscore-dangle
  return element.type.muiName === 'Grid' || element.type?._payload?.value?.muiName === 'Grid';
}
const gridAtomics = /*#__PURE__*/ _atomics({
  styles: {
    flexDirection: {
      column: {
        xs: 'g1s0u14x1',
        sm: 'g1s0u14x16',
        md: 'g1s0u14x31',
        lg: 'g1s0u14x46',
        xl: 'g1s0u14x61',
      },
      'column-reverse': {
        xs: 'g1s0u14x2',
        sm: 'g1s0u14x17',
        md: 'g1s0u14x32',
        lg: 'g1s0u14x47',
        xl: 'g1s0u14x62',
      },
      row: {
        xs: 'g1s0u14x3',
        sm: 'g1s0u14x18',
        md: 'g1s0u14x33',
        lg: 'g1s0u14x48',
        xl: 'g1s0u14x63',
      },
      'row-reverse': {
        xs: 'g1s0u14x4',
        sm: 'g1s0u14x19',
        md: 'g1s0u14x34',
        lg: 'g1s0u14x49',
        xl: 'g1s0u14x64',
      },
    },
    '--Grid-parent-column-count': {
      '--Grid-parent-column-count': {
        xs: 'g1s0u14x5',
        sm: 'g1s0u14x20',
        md: 'g1s0u14x35',
        lg: 'g1s0u14x50',
        xl: 'g1s0u14x65',
      },
    },
    '--Grid-parent-column-spacing': {
      '--Grid-parent-column-spacing': {
        xs: 'g1s0u14x6',
        sm: 'g1s0u14x21',
        md: 'g1s0u14x36',
        lg: 'g1s0u14x51',
        xl: 'g1s0u14x66',
      },
    },
    '--Grid-parent-row-spacing': {
      '--Grid-parent-row-spacing': {
        xs: 'g1s0u14x7',
        sm: 'g1s0u14x22',
        md: 'g1s0u14x37',
        lg: 'g1s0u14x52',
        xl: 'g1s0u14x67',
      },
    },
    '--Grid-self-column-span': {
      '--Grid-self-column-span': {
        xs: 'g1s0u14x8',
        sm: 'g1s0u14x23',
        md: 'g1s0u14x38',
        lg: 'g1s0u14x53',
        xl: 'g1s0u14x68',
      },
    },
    '--Grid-self-width': {
      '--Grid-self-width': {
        xs: 'g1s0u14x9',
        sm: 'g1s0u14x24',
        md: 'g1s0u14x39',
        lg: 'g1s0u14x54',
        xl: 'g1s0u14x69',
      },
    },
    '--Grid-self-max-width': {
      '--Grid-self-max-width': {
        xs: 'g1s0u14x10',
        sm: 'g1s0u14x25',
        md: 'g1s0u14x40',
        lg: 'g1s0u14x55',
        xl: 'g1s0u14x70',
      },
    },
    '--Grid-self-flex': {
      '--Grid-self-flex': {
        xs: 'g1s0u14x11',
        sm: 'g1s0u14x26',
        md: 'g1s0u14x41',
        lg: 'g1s0u14x56',
        xl: 'g1s0u14x71',
      },
    },
    '--Grid-self-column-spacing': {
      '--Grid-self-column-spacing': {
        xs: 'g1s0u14x12',
        sm: 'g1s0u14x27',
        md: 'g1s0u14x42',
        lg: 'g1s0u14x57',
        xl: 'g1s0u14x72',
      },
    },
    '--Grid-self-row-spacing': {
      '--Grid-self-row-spacing': {
        xs: 'g1s0u14x13',
        sm: 'g1s0u14x28',
        md: 'g1s0u14x43',
        lg: 'g1s0u14x58',
        xl: 'g1s0u14x73',
      },
    },
    '--Grid-self-offset': {
      '--Grid-self-offset': {
        xs: 'g1s0u14x14',
        sm: 'g1s0u14x29',
        md: 'g1s0u14x44',
        lg: 'g1s0u14x59',
        xl: 'g1s0u14x74',
      },
    },
    '--Grid-self-margin-left': {
      '--Grid-self-margin-left': {
        xs: 'g1s0u14x15',
        sm: 'g1s0u14x30',
        md: 'g1s0u14x45',
        lg: 'g1s0u14x60',
        xl: 'g1s0u14x75',
      },
    },
  },
  shorthands: {},
  conditions: ['xs', 'sm', 'md', 'lg', 'xl'],
  defaultCondition: 'xs',
  unitless: ['--Grid-parent-column-count', '--Grid-self-column-span', '--Grid-self-offset'],
  multipliers: {
    '--Grid-parent-column-spacing': undefined,
    '--Grid-parent-row-spacing': undefined,
    '--Grid-self-column-spacing': undefined,
    '--Grid-self-row-spacing': undefined,
  },
  inlineGetters: {
    '--Grid-self-width': (value) => {
      if (value === 'grow') {
        return 'unset';
      }
      if (value === 'auto') {
        return 'auto';
      }
      return 'var(--Grid-fixed-width)';
    },
    '--Grid-self-max-width': (value) => {
      if (value === 'grow') {
        return '100%';
      }
      if (value === 'auto') {
        return 'none';
      }
      return 'unset';
    },
    '--Grid-self-flex': (value) => {
      if (value === 'grow') {
        return '1 1 0';
      }
      if (value === 'auto') {
        return '0 0 auto';
      }
      return '0 1 auto';
    },
    '--Grid-self-margin-left': (value) => {
      if (value === 'auto') {
        return 'auto';
      }
      return 'var(--Grid-fixed-offset)';
    },
  },
});
const GridComponent = /*#__PURE__*/ _styled('div')({
  classes: ['g1i5ygey'],
  variants: [
    {
      props: {
        container: true,
      },
      className: 'g1i5ygey-1',
    },
    {
      props: ({ size }) => size !== undefined,
      className: 'g1i5ygey-2',
    },
    {
      props: ({ offset }) => offset !== undefined,
      className: 'g1i5ygey-3',
    },
    {
      props: {
        wrap: 'nowrap',
        container: true,
      },
      className: 'g1i5ygey-4',
    },
    {
      props: {
        wrap: 'wrap-reverse',
        container: true,
      },
      className: 'g1i5ygey-5',
    },
    {
      props: {
        wrap: 'wrap',
        container: true,
      },
      className: 'g1i5ygey-6',
    },
  ],
});
const Grid = React.forwardRef(function Grid(
  {
    children,
    columns,
    spacing,
    columnSpacing,
    rowSpacing,
    direction = 'row',
    style,
    className,
    component = 'div',
    container = false,
    size,
    offset,
    // internal props
    // eslint-disable-next-line react/prop-types
    unstable_parent_columns,
    // eslint-disable-next-line react/prop-types
    unstable_parent_column_spacing,
    // eslint-disable-next-line react/prop-types
    unstable_parent_row_spacing,
    wrap = 'wrap',
    ...other
  },
  ref,
) {
  const selfColumns = columns ?? unstable_parent_columns ?? 12;
  const selfColumnSpacing = columnSpacing ?? spacing ?? unstable_parent_column_spacing ?? 0;
  const selfRowSpacing = rowSpacing ?? spacing ?? unstable_parent_row_spacing ?? 0;
  const gridAtomicsObj = {
    flexDirection: direction,
  };
  if (unstable_parent_columns !== undefined) {
    gridAtomicsObj['--Grid-parent-column-count'] = unstable_parent_columns;
  }
  if (unstable_parent_column_spacing !== undefined) {
    gridAtomicsObj['--Grid-parent-column-spacing'] = unstable_parent_column_spacing;
  }
  if (unstable_parent_row_spacing !== undefined) {
    gridAtomicsObj['--Grid-parent-row-spacing'] = unstable_parent_row_spacing;
  }
  if (container) {
    gridAtomicsObj['--Grid-self-column-spacing'] = selfColumnSpacing;
    gridAtomicsObj['--Grid-self-row-spacing'] = selfRowSpacing;
  }
  if (size) {
    gridAtomicsObj['--Grid-self-column-span'] = size;
    gridAtomicsObj['--Grid-self-width'] = size;
    gridAtomicsObj['--Grid-self-max-width'] = size;
    gridAtomicsObj['--Grid-self-flex'] = size;
  }
  if (offset) {
    gridAtomicsObj['--Grid-self-offset'] = offset;
    gridAtomicsObj['--Grid-self-margin-left'] = offset;
  }
  const ownerState = {
    container,
    size,
    offset,
    wrap,
  };
  const gridClasses = gridAtomics(gridAtomicsObj);
  return (
    <GridComponent
      as={component}
      ref={ref}
      className={clsx(gridClasses.className, className)}
      style={{
        ...style,
        ...gridClasses.style,
      }}
      {...other}
      ownerState={ownerState}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child) && isGridComponent(child)) {
          return React.cloneElement(child, {
            unstable_parent_columns: selfColumns,
            unstable_parent_column_spacing: selfColumnSpacing,
            unstable_parent_row_spacing: selfRowSpacing,
          });
        }
        return child;
      })}
    </GridComponent>
  );
});
Grid.muiName = 'Grid';
process.env.NODE_ENV !== 'production' &&
  (Grid.propTypes /* remove-proptypes */ = {
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
     * @ignore
     */
    columns: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
      PropTypes.arrayOf(PropTypes.number),
      PropTypes.number,
      PropTypes.object,
    ]),
    /**
     * @ignore
     */
    columnSpacing: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
      PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired),
      PropTypes.number,
      PropTypes.object,
      PropTypes.string,
    ]),
    /**
     * The component used for the root node.
     * Either a string to use a HTML element or a component.
     */
    component: PropTypes.elementType,
    /**
     * @ignore
     */
    container: PropTypes.bool,
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
    offset: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
      PropTypes.arrayOf(PropTypes.number),
      PropTypes.number,
      PropTypes.object,
    ]),
    /**
     * @ignore
     */
    rowSpacing: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
      PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired),
      PropTypes.number,
      PropTypes.object,
      PropTypes.string,
    ]),
    /**
     * @ignore
     */
    size: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
      PropTypes.arrayOf(PropTypes.number),
      PropTypes.number,
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
    /**
     * @ignore
     */
    style: PropTypes.object,
    /**
     * Defines the `flex-wrap` style property.
     * It's applied for all screen sizes.
     * @default 'wrap'
     */
    wrap: PropTypes.oneOf(['nowrap', 'wrap-reverse', 'wrap']),
  });
Grid.displayName = 'Grid';
export default Grid;
