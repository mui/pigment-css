export interface Theme {}

type Join<K extends string | number, P extends string> = K extends string | number
  ? P extends ''
    ? `${K}`
    : `${P}.${K}`
  : never;

type PathsToLeaves<T extends object, P extends string = ''> = {
  [K in keyof T]: T[K] extends object
    ? PathsToLeaves<T[K], Join<K & string, P>>
    : Join<K & string, P>;
}[keyof T];

export type ThemeKey = `$${PathsToLeaves<Theme>}`;

/**
 * It just returns what it receives at this point. Actual transformation happens during the build time
 * separately.
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
 *   border: `1px solid t('$palette.main')`,
 * })
 * ```
 */
export function t(themeKey: ThemeKey): ThemeKey {
  return themeKey;
}
