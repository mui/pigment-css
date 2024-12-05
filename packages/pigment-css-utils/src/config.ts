import { Theme } from '@pigment-css/theme';
import { IOptions } from '@wyw-in-js/processor-utils';

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
type PigmentFeature = {
  useLayer?: boolean;
};

/**
 * This is the base Pigment Config that'll be used by bundler package with some extra bundler specific options.
 */
export type PigmentConfig = IOptions & {
  features?: PigmentFeature;
  generateClassName<M, E>(data: GenerateClassData<M, E>): string;
  themeArgs?: {
    theme: Theme;
  };
};
