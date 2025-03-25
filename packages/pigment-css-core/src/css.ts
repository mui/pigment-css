import { generateErrorMessage } from './utils';

import { CSSObjectNoCallback, CSSProperties, Primitive, ThemeArgs } from './base';

export type CssFn<Props extends object> = (props: Props) => string | number;

export type Variants = {
  [VariantGroup: string]: {
    [VariantName: string]: CSSObjectNoCallback;
  };
};

export type VariantNames<T extends Variants> = {
  [K in keyof T]?: keyof T[K];
};

export type CompoundVariant<T extends Variants> = VariantNames<T> & {
  css: CSSProperties;
};

type CVAConfig<V extends Variants> = {
  /**
   * Documentation: https://pigment-css.com/features/styling#variants
   */
  variants?: V;
  /**
   * Documentation: https://pigment-css.com/features/styling#compound-variants
   */
  compoundVariants?: CompoundVariant<V>[];
  /**
   * Documentation: https://pigment-css.com/features/styling#default-variants
   */
  defaultVariants?: VariantNames<V>;
};

export type ClassNameOptions =
  | {
      variantName: string;
      variantValue: string;
    }
  | {
      isCv: true;
    };

export interface BaseInterface {
  /**
   * Corresponds to css class name for `css` or `styled` function calls and keyframe name for `keyframes` function call.
   */
  className?: string | ((opts?: ClassNameOptions) => string);
}

type TemplateLiteralItems = Primitive | CSSProperties;

type CSSWithVariants<V extends Variants> = CSSObjectNoCallback & CVAConfig<V>;

type CssValue<V extends Variants> = CSSWithVariants<V> | string;

export type CssArg<V extends Variants> = ((themeArgs: ThemeArgs) => CssValue<V>) | CssValue<V>;

type CssReturn = {
  className: string;
  style?: CSSProperties;
};

type CssReturnFn<Props extends {}> = (props?: Props) => CssReturn;

interface CssNoOption {
  (
    arg: TemplateStringsArray,
    ...templateArgs: (TemplateLiteralItems | CssFn<{}>)[]
  ): CssReturnFn<{}>;

  <V extends Variants>(...args: CssArg<V>[]): CssReturnFn<VariantNames<V>>;
}

interface CssWithOption {
  <M extends BaseInterface>(metadata: M): CssNoOption;
}

/**
 * Documentation: https://pigment-css.com/features/styling#css
 */
const css: CssNoOption & CssWithOption = () => {
  throw new Error(generateErrorMessage('css'));
};

export default css;
