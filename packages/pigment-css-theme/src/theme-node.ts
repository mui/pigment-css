import { ThemeKey } from './theme';

class WrapperString extends String {
  isThemeVar = true;
}

/**
 * It just returns what it receives at this point but with a wrapper to identify in Node.js.
 * It is there to strictly type first argument as per the overridden `Theme`.
 *
 * @example Usage in application
 *
 * ```js
 * import { t } from '@pigment-css/theme';
 * import { css } from '@pigment-css/core';
 *
 * // override Theme type as per docs
 *
 * const cls1 = css({
 *   border: `1px solid ${t('$palette.main')}`,
 * })
 * ```
 */
export function t(themeKey: ThemeKey): WrapperString {
  return new WrapperString(themeKey);
}
