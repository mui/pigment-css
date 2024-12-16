import type { CSSProperties, Primitve, ThemeArgs } from './base';
import { BaseInterface, CssFn } from './css';

interface KeyframesObject {
  [key: string]: {
    [K in keyof CSSProperties]: CSSProperties[K] | Array<CSSProperties[K]>;
  };
}

type KeyframesArg = ((themeArgs: ThemeArgs) => KeyframesObject) | KeyframesObject;

interface Keyframes {
  /**
   * @returns {string} The generated keyframe name to be referenced.
   */
  (arg: TemplateStringsArray, ...templateArgs: (Primitve | CssFn)[]): string;
  <M extends BaseInterface>(
    metadata: M,
  ): (arg: TemplateStringsArray, ...templateArgs: (Primitve | CssFn)[]) => string;
  /**
   * @returns {string} The generated keyframe name to be referenced.
   */
  (arg: KeyframesArg): string;
  <M extends BaseInterface>(metadata: M, args: KeyframesArg): string;
}

declare const keyframes: Keyframes;

export default keyframes;
