import type { CSSObjectNoCallback } from './base';
import type { ThemeArgs } from './theme';

export type SxProp =
  | CSSObjectNoCallback
  | ((themeArgs: ThemeArgs['theme']) => CSSObjectNoCallback)
  | ReadonlyArray<CSSObjectNoCallback | ((themeArgs: ThemeArgs['theme']) => CSSObjectNoCallback)>;

export default function sx(arg: SxProp | Array<SxProp>, componentClass?: string): string;
