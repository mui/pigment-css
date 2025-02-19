export interface Theme {}

type Join<Left, Right, Separator extends string = '.'> = Left extends string | number
  ? Right extends string | number
    ? `${Left}${Right extends '' ? '' : Separator}${Right}`
    : never
  : never;

type PathsToLeaves<T extends object> = {
  [K in keyof T]: K extends string | number
    ? T[K] extends object
      ? Join<K, PathsToLeaves<T[K]>>
      : K extends `$${string}`
        ? never
        : K extends `_${string}`
          ? never
          : `${K}`
    : never;
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
 *   border: `1px solid ${t('$palette.main')}`,
 * })
 * ```
 */
export function t(themeKey: ThemeKey): ThemeKey {
  return themeKey;
}
