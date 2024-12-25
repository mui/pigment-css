import { CSSObjectNoCallback, Primitive, ThemeArgs } from './base';

type IVariant = {
  variants?: Record<string, Record<string, CSSObjectNoCallback>>;
};

type CssObj = CSSObjectNoCallback & IVariant;

type CssArg = ((themeArgs: ThemeArgs) => CssObj | string) | CssObj | string;
export type CssFn = (themeArgs: ThemeArgs) => string | number;

export interface BaseInterface {
  /**
   * Corresponds to css class name for `css` function call and keyframe name when passed to `keyframes`
   */
  className: string;
}

interface Css {
  /**
   * @returns {string} The generated css class name to be referenced.
   */
  (arg: TemplateStringsArray, ...templateArgs: (Primitive | CssFn)[]): string;
  <M extends BaseInterface>(
    metadata: M,
  ): (arg: TemplateStringsArray, ...templateArgs: (Primitive | CssFn)[]) => string;

  /**
   * @returns {string} The generated css class name to be referenced.
   */
  (...args: CssArg[]): () => string;
  <M extends BaseInterface>(metadata: M, args: CssArg | CssArg[]): string;
}

declare const css: Css;

export default css;
