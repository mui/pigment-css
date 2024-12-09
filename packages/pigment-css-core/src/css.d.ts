import { CSSObjectNoCallback, Primitve, ThemeArgs } from './base';

type IVariant = {
  variants?: Record<string, Record<string, CSSObjectNoCallback>>;
};

type CssObj = CSSObjectNoCallback & IVariant;

type CssArg = ((themeArgs: ThemeArgs) => CssObj | string) | CssObj | string;
type CssFn = (themeArgs: ThemeArgs) => string | number;

interface BaseInterface {
  className: string;
}

interface Css {
  /**
   * @returns {string} The generated css class name to be referenced.
   */
  (arg: TemplateStringsArray, ...templateArgs: (Primitve | CssFn)[]): string;
  <M extends BaseInterface>(
    metadata: M,
  ): (arg: TemplateStringsArray, ...templateArgs: (Primitve | CssFn)[]) => string;

  /**
   * @returns {string} The generated css class name to be referenced.
   */
  (...args: CssArg[]): () => string;
  <M extends BaseInterface>(metadata: M, args: CssArg | CssArg[]): string;
}

declare const css: Css;

export default css;
