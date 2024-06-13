/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable react/jsx-filename-extension */
import clsx from 'clsx';
import PropTypes from 'prop-types';
import * as React from 'react';

import { gridAtomics } from './baseAtomics';
import styled from './styled';

function isGridComponent(element) {
  // For server components `muiName` is avaialble in element.type._payload.value.muiName
  // relevant info - https://github.com/facebook/react/blob/2807d781a08db8e9873687fccc25c0f12b4fb3d4/packages/react/src/ReactLazy.js#L45
  // eslint-disable-next-line no-underscore-dangle
  return element.type.muiName === 'Grid' || element.type?._payload?.value?.muiName === 'Grid';
}

const GridComponent = styled('div')({
  variants: [
    {
      props: { container: true },
      style: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: 'var(--Grid-self-row-spacing) var(--Grid-self-column-spacing)',
      }
    },
    {
      props: ({ size }) => size !== undefined,
      style: {
        width: 'var(--Grid-self-width)',
        maxWidth: 'var(--Grid-self-max-width)',
        flex: 'var(--Grid-self-flex)',
      }
    },
    {
      props: ({ offset }) => offset !== undefined,
      style: {
        marginLeft: 'var(--Grid-self-margin-left)',
      }
    }
  ]
})

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
    ...rest
  },
  ref,
) {

  const selfColumns = columns ?? unstable_parent_columns ?? 12;
  const selfColumnSpacing = columnSpacing ?? spacing ?? unstable_parent_column_spacing ?? 0;
  const selfRowSpacing = rowSpacing ?? spacing ?? unstable_parent_row_spacing ?? 0;

  const GridAtomicsObj = {
    direction,
  };

  if (unstable_parent_columns !== undefined) {
    GridAtomicsObj['--Grid-parent-column-count'] = unstable_parent_columns;
  }

  if (unstable_parent_column_spacing !== undefined) {
    GridAtomicsObj['--Grid-parent-column-spacing'] = unstable_parent_column_spacing;
  }

  if (unstable_parent_row_spacing !== undefined) {
    GridAtomicsObj['--Grid-parent-row-spacing'] = unstable_parent_row_spacing;
  }

  if (container) {
    GridAtomicsObj['--Grid-self-column-spacing'] = selfColumnSpacing;
    GridAtomicsObj['--Grid-self-row-spacing'] = selfRowSpacing;
  }

  if (size) {
    GridAtomicsObj['--Grid-self-column-span'] = size;
    GridAtomicsObj['--Grid-self-width'] = size;
    GridAtomicsObj['--Grid-self-max-width'] = size;
    GridAtomicsObj['--Grid-self-flex'] = size;
    
  }
  if (offset) {
    GridAtomicsObj['--Grid-self-offset'] = offset;
    GridAtomicsObj['--Grid-self-margin-left'] = offset;
  }

  const ownerState = { container, size, offset };

  const GridClasses = gridAtomics(GridAtomicsObj);
  return (
    <GridComponent
      as={component}
      ref={ref}
      className={clsx(GridClasses.className, className)}
      style={{ ...style, ...GridClasses.style }}
      {...rest}
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

process.env.NODE_ENV !== 'production'
  && (Grid.propTypes /* remove-proptypes */ = {
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
      
    })

Grid.displayName = 'Grid';

export default Grid;
