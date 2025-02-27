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
  variants?: V;
  compoundVariants?: CompoundVariant<V>[];
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

declare const css: CssNoOption & CssWithOption;
export default css;
