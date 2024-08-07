import type { CSSObject } from '@emotion/css';
import { css, cache } from './emotion';
import type { PluginCustomOptions } from './cssFnValueToVariable';

export function processCssObject(
  cssObj: object,
  themeArgs?: PluginCustomOptions['themeArgs'],
  skipSx = true,
) {
  const processedObj =
    // `unstable_sx` is currently an internal API for integrating Material UI with Pigment CSS only.
    // so for Pigment CSS users, the shorthand `sx` prop is not supported yet.
    (skipSx ? cssObj : themeArgs?.theme?.unstable_sx?.(cssObj) || cssObj) as CSSObject;
  const className = css(processedObj);
  return cache.registered[className] as string;
}
