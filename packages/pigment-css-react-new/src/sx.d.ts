import type { CSSObjectNoCallback, ThemeArgs } from '@pigment-css/core';

type GetTheme<Argument> = Argument extends { theme: infer Theme } ? Theme : never;

export type SxProp =
  | CSSObjectNoCallback
  | ((theme: GetTheme<ThemeArgs>) => CSSObjectNoCallback)
  | ReadonlyArray<CSSObjectNoCallback | ((theme: GetTheme<ThemeArgs>) => CSSObjectNoCallback)>;

export default function sx(arg: SxProp, componentClass?: string): string;
