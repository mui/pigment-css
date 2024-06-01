import type { CSSObject } from '@emotion/css';
import { css, cache } from './emotion';
import type { PluginCustomOptions } from './cssFnValueToVariable';

export function processCssObject(
  cssObj: object,
  themeArgs?: PluginCustomOptions['themeArgs'],
  skipSx = true,
) {
  const processedObj = (
    skipSx ? cssObj : themeArgs?.theme?.unstable_sx?.(cssObj) || cssObj
  ) as CSSObject;
  const className = css(processedObj);
  return cache.registered[className];
}
