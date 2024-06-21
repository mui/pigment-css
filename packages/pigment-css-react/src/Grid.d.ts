import * as CSS from 'csstype';

import { Breakpoint } from './base';
import { PolymorphicComponent } from './Box';

type CssProperty<T> = T | Array<T> | Partial<Record<Breakpoint, T>>;

type GridBaseProps = {
  className?: string;
  columns?: CssProperty<number>;
  columnSpacing?: CssProperty<number | string>;
  container?: boolean;
  direction?: CssProperty<CSS.StandardLonghandProperties['flexDirection']>;
  offset?: CssProperty<number | 'auto'>;
  rowSpacing?: CssProperty<number | string>;
  size?: CssProperty<number | 'grow' | 'auto'>;
  spacing?: CssProperty<number | string>;
};

declare const Grid: PolymorphicComponent<GridBaseProps>;

export default Grid;
