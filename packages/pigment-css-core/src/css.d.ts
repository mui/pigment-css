import { ClassNameOptions } from '@pigment-css/utils';
import { CSSObjectNoCallback, CSSProperties, Primitive, ThemeArgs } from './base';

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
  className?: string | ((opts?: ClassNameOptions) => string);
}

/**
 * New CSS
 */

type CssReturn = {
  className: string;
  style?: CSSProperties;
};

interface CssNoOption {
  (arg: TemplateStringsArray, ...templateArgs: (Primitive | CssFn)[]): CssReturn;
  (...args: CssArg[]): CssReturn;
}

interface CssFunction {
  (arg: TemplateStringsArray, ...templateArgs: (Primitive | CssFn)[]): CssReturn;
  (...args: CssArg[]): CssReturn;
}

interface CssWithOption {
  <M extends BaseInterface>(metadata: M): CssFunction;
}

declare const css: CssNoOption & CssWithOption;
export default css;
