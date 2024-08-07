import * as CSS from 'csstype';

import { Breakpoint } from './base';
import { PolymorphicComponent } from './Box';

type CssProperty<T> = T | Array<T> | Partial<Record<Breakpoint, T>>;

type StackBaseProps = {
  spacing?: CssProperty<number | string>;
  direction?: CssProperty<CSS.StandardLonghandProperties['flexDirection']>;
  divider?: React.ReactNode;
  className?: string;
};

declare const Stack: PolymorphicComponent<
  StackBaseProps & React.DetailsHTMLAttributes<HTMLDivElement>
>;

export default Stack;
