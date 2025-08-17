import type { CSSObjectNoCallback } from './base';
import type { ThemeArgs } from './theme';

type GetTheme<Argument> = Argument extends { theme: infer Theme } ? Theme : never;

export type SxProp =
  | CSSObjectNoCallback
  | ((theme: GetTheme<ThemeArgs>) => CSSObjectNoCallback)
  | ReadonlyArray<CSSObjectNoCallback | ((theme: GetTheme<ThemeArgs>) => CSSObjectNoCallback) | false>;

export default function sx(arg: SxProp, componentClass?: string): string;
