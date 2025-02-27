import type * as CSS from 'csstype';
import { Theme, ThemeKey } from '@pigment-css/theme';

export type CSSProperties = CSS.PropertiesFallback<number | string> & {
  [index: `--${string}`]: string;
  [index: `$${string}`]: string;
};

type CSSPropertiesBase = {
  [K in keyof CSSProperties]: CSSProperties[K];
};

export type CSSPropertiesMultiValue = {
  [K in keyof CSSProperties]:
    | ThemeKey
    | CSSProperties[K]
    | Array<Extract<CSSProperties[K], string>>;
};

export type CSSPseudosNoCallback = { [K in CSS.Pseudos]?: CSSObjectNoCallback };

export interface CSSOthersObjectNoCallback {
  [selector: string]: CSSObjectNoCallback;
}

export type CSSObjectNoCallback =
  | CSSPropertiesMultiValue
  | CSSPseudosNoCallback
  | CSSOthersObjectNoCallback;

export type CSSPropertiesMultiValueWithProps<Props extends object> = {
  [K in keyof CSSPropertiesMultiValue]:
    | CSSPropertiesMultiValue[K]
    | ((props: Props) => CSSPropertiesBase[K]);
};

export type CSSPseudos<Props extends object> = { [K in CSS.Pseudos]?: CSSObject<Props> };

export interface CSSOthersObject<Props extends object> {
  [selector: string]: CSSObject<Props>;
}

export type CSSObject<Props extends object> =
  | CSSPropertiesMultiValueWithProps<Props>
  | CSSPseudos<Props>
  | CSSOthersObject<Props>;

export type ThemeArgs = {
  theme: Theme;
};
export type Primitive = string | String | null | undefined | boolean | number;
