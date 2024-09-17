/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable react/jsx-filename-extension */
import clsx from 'clsx';
import PropTypes from 'prop-types';
import * as React from 'react';

import { generateAtomics } from './generateAtomics';
import styled from './styled';

function isGridComponent(element) {
  try {
    // For server components `muiName` is avaialble in element.type._payload.value.muiName
    // relevant info - https://github.com/facebook/react/blob/2807d781a08db8e9873687fccc25c0f12b4fb3d4/packages/react/src/ReactLazy.js#L45
    // eslint-disable-next-line no-underscore-dangle
    return element.type.muiName === 'Grid' || element.type?._payload?.value?.muiName === 'Grid';
  } catch (error) {
    // Covers for the case in which the Grid is a server component and the child is a client component
    // https://github.com/mui/material-ui/issues/43635
    return false;
  }
}

const gridAtomics = generateAtomics(({ theme }) => {
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
      '--Grid-parent-column-count': ['--Grid-parent-column-count'],
      '--Grid-parent-column-spacing': ['--Grid-parent-column-spacing'],
      '--Grid-parent-row-spacing': ['--Grid-parent-row-spacing'],
      '--Grid-self-column-span': ['--Grid-self-column-span'],
      '--Grid-self-width': ['--Grid-self-width'],
      '--Grid-self-max-width': ['--Grid-self-max-width'],
      '--Grid-self-flex': ['--Grid-self-flex'],
      '--Grid-self-column-spacing': ['--Grid-self-column-spacing'],
      '--Grid-self-row-spacing': ['--Grid-self-row-spacing'],
      '--Grid-self-offset': ['--Grid-self-offset'],
      '--Grid-self-margin-left': ['--Grid-self-margin-left'],
    },
    unitless: ['--Grid-parent-column-count', '--Grid-self-column-span', '--Grid-self-offset'],
    multipliers: {
      '--Grid-parent-column-spacing': Array.isArray(theme.vars?.spacing)
        ? theme.vars.spacing[0]
        : theme.vars?.spacing,
      '--Grid-parent-row-spacing': Array.isArray(theme.vars?.spacing)
        ? theme.vars.spacing[0]
        : theme.vars?.spacing,
      '--Grid-self-column-spacing': Array.isArray(theme.vars?.spacing)
        ? theme.vars.spacing[0]
        : theme.vars?.spacing,
      '--Grid-self-row-spacing': Array.isArray(theme.vars?.spacing)
        ? theme.vars.spacing[0]
        : theme.vars?.spacing,
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
  };
});

const GridComponent = styled('div')({
  '--Grid-fixed-width':
    'calc(100% * var(--Grid-self-column-span) / var(--Grid-parent-column-count) - (var(--Grid-parent-column-count) - var(--Grid-self-column-span)) * var(--Grid-parent-column-spacing) / var(--Grid-parent-column-count))',
  '--Grid-fixed-offset':
    'calc(100% * var(--Grid-self-offset) / var(--Grid-parent-column-count) + var(--Grid-parent-column-spacing) * var(--Grid-self-offset) / var(--Grid-parent-column-count))',
  variants: [
    {
      props: { container: true },
      style: {
        display: 'flex',
        gap: 'var(--Grid-self-row-spacing) var(--Grid-self-column-spacing)',
      },
    },
    {
      props: ({ size }) => size !== undefined,
      style: {
        width: 'var(--Grid-self-width)',
        maxWidth: 'var(--Grid-self-max-width)',
        flex: 'var(--Grid-self-flex)',
      },
    },
    {
      props: ({ offset }) => offset !== undefined,
      style: {
        marginLeft: 'var(--Grid-self-margin-left)',
      },
    },
    ...['nowrap', 'wrap-reverse', 'wrap'].map((wrap) => ({
      props: { wrap, container: true },
      style: {
        flexWrap: wrap,
      },
    })),
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

  const ownerState = { container, size, offset, wrap };

  const gridClasses = gridAtomics(gridAtomicsObj);
  return (
    <GridComponent
      as={component}
      ref={ref}
      className={clsx(gridClasses.className, className)}
      style={{ ...style, ...gridClasses.style }}
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
