import * as CSS from 'csstype';

import { Breakpoint } from './base';
import { PolymorphicComponent } from './Box';

type CssProperty<T> = T | Array<T> | Partial<Record<Breakpoint, T>>;

type GridBaseProps = {
  display?: CssProperty<'flex' | 'inline-flex'>;
  spacing?: CssProperty<number | string>;
  direction?: CssProperty<CSS.StandardLonghandProperties['flexDirection']>;
  justifyContent?: CssProperty<CSS.StandardLonghandProperties['justifyContent']>;
  alignItems?: CssProperty<CSS.StandardLonghandProperties['alignItems']>;
  divider?: React.ReactNode;
  className?: string;
};

declare const Grid: PolymorphicComponent<GridBaseProps>;

export default Grid;
