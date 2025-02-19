import { Theme } from '@pigment-css/theme';
import { PluginOptions } from '@wyw-in-js/transform';

export type GenerateClassData<M, E> = {
  /**
   * Original classname that would be used if not customized.
   */
  slug: string;
  /**
   * The metadata argument that you passed to the function call, usually as the 2nd argument.
   *
   * ```js
   * const className = css(cssObject, metadata);
   */
  metadata: M;
  /**
   * The variable name that the function call's return value is assigned to.
   */
  displayName: string;
  /**
   * The name of the function that is being called, ie, `css`, `styled`, etc
   */
  functionName: string;
  /**
   * All the extra data specific to the above `functionName` call.
   */
  extraData: E;
};

/**
 * Feature flags that user can choose to enable/disable to control the output
 */
type PigmentFeatures = {
  useLayer?: boolean;
};

/**
 * This is the base Pigment Config that'll be used by bundler package with some extra bundler specific options.
 */
export type PigmentConfig = Omit<Partial<PluginOptions>, 'features'> & {
  wywFeatures?: PluginOptions['features'];
  features?: PigmentFeatures;
  generateClassName?: <M, E>(data: GenerateClassData<M, E>) => string;
  themeArgs?: {
    theme: Theme;
  };
  /**
   *
   * @param {string} tag The function that was imported
   * @param {string} source The path that the function was imported from
   *
   * If returning a string, this will be used as the import path in the final transform.
   *
   * @example
   *
   * __Input Code__
   *
   * ```js
   * import { css } from '@pigment-css/core';
   *
   * const cls1 = css({});
   * ```
   * __config__
   * ```js
   * {
   *   runtimeReplacementPath(tag, source) {
   *     if (tag === 'css') {
   *       return `@my-lib/runtime/css`;
   *     }
   *     return null;
   *   }
   * }
   *```
   * __Output__
   *
   * ```js
   * import { css } from '@my-lib/runtime/css';
   *
   * const cls1 = css({});
   * ```
   */
  runtimeReplacementPath?: (tag: string, source: string) => string | null;
};

/**
 * @internal
 */
export type TransformedInternalConfig = Omit<PigmentConfig, 'wywFeatures' | 'features'> & {
  feautres?: PluginOptions['features'];
  pigmentFeatures?: PigmentFeatures;
};

/**
 * Internal utility to convert Pigment CSS configuration object to be usable by WyW
 */
export function transformPigmentConfig(config?: PigmentConfig): TransformedInternalConfig {
  const { features, wywFeatures, ...rest } = config ?? {};
  return {
    ...rest,
    pigmentFeatures: features,
    feautres: wywFeatures,
  };
}
