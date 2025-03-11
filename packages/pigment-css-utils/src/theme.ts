import { serializeStyles } from '@emotion/serialize';
import setWith from 'lodash/setWith';
import { getCSSVar } from './utils/processStyle';

interface Theme extends Record<string, unknown> {}

const PIGMENT_LAYERS = ['globals', 'utils', 'base', 'variants', 'compoundvariants', 'sx'];

function isPrimitive(val: unknown): val is string | number | boolean | undefined | null | Function {
  const valType = typeof val;
  return (
    valType === 'string' ||
    valType === 'number' ||
    valType === 'boolean' ||
    valType === 'undefined' ||
    valType === 'function' ||
    val === null
  );
}

function iterateObject<Obj extends Record<string, unknown> | unknown[]>(
  obj: Obj,
  onPrimitive: (paths: (string | number)[], value: unknown) => void,
  paths: (string | number)[] = [],
) {
  function iterate(value: unknown, newPaths: (string | number)[]) {
    if (isPrimitive(value)) {
      onPrimitive(newPaths, value);
    } else if (typeof value === 'object' && value) {
      iterateObject(value as Obj, onPrimitive, newPaths);
    }
  }

  if (Array.isArray(obj)) {
    obj.forEach((value, index) => {
      const newPaths = paths.concat(index);
      iterate(value, newPaths);
    });
  } else {
    Object.keys(obj).forEach((key) => {
      const newPaths = paths.concat(key);
      const value = obj[key];
      iterate(value, newPaths);
    });
  }
}

function generateVars(theme: Theme, prefix = '') {
  const cssVars: Record<string, string> = {};
  iterateObject(
    theme,
    (paths, value) => {
      if (typeof value === 'string' || typeof value === 'number') {
        if (typeof paths[0] === 'string' && paths[0].startsWith('$$')) {
          return;
        }
        const val = (value as string).toString();
        cssVars[`--${paths.join('-')}`] = val[0] === '$' ? getCSSVar(val, true) : val;
      }
    },
    prefix ? [prefix] : undefined,
  );
  return cssVars;
}

export function generateCssFromTheme(theme?: unknown, prefix = '') {
  let themeObj: ThemeOptions<{}, 'light'> | undefined;
  const themePrefix =
    typeof theme === 'object' && theme && 'prefix' in theme && theme.prefix
      ? (theme.prefix as string)
      : prefix;

  if (typeof theme === 'object' && theme && 'colorSchemes' in theme) {
    themeObj = theme as ThemeOptions<{}, 'light'>;
  } else if (theme) {
    themeObj = { colorSchemes: { light: theme }, defaultScheme: 'light' };
  }

  const cssVars = themeObj
    ? generateVars(themeObj.colorSchemes[themeObj.defaultScheme], themePrefix)
    : {};
  const defaultSelector = themeObj?.getSelector?.(themeObj.defaultScheme) ?? ':root';
  cssVars.colorScheme = 'light';
  if (themeObj?.defaultScheme) {
    cssVars.colorScheme = themeObj.defaultScheme;
  }
  const cssObj = { [defaultSelector]: cssVars };
  Object.keys(themeObj?.colorSchemes ?? {})
    .filter((key) => key !== themeObj?.defaultScheme)
    .forEach((key) => {
      const tokens = generateVars(themeObj?.colorSchemes[key as 'light'] ?? {}, themePrefix);
      if (key === 'dark' || key === 'light') {
        tokens.colorScheme = key;
      }
      const selector =
        themeObj?.getSelector?.(key as 'light' | 'system') ?? `[data-theme="${key}"]`;
      cssObj[selector] = tokens;
    });
  if (themeObj?.getSelector) {
    cssObj[themeObj.getSelector('system')] = {
      colorScheme: themeObj.defaultScheme,
    };
  }
  const rootStyle = {
    '@layer pigment.utils': {
      ...cssObj,
      ...(themeObj?.getSelector
        ? {
            [`@media (prefers-color-scheme: ${themeObj.defaultScheme === 'light' ? 'dark' : 'light'})`]:
              {
                [themeObj.getSelector('system')]:
                  themeObj.defaultScheme === 'light'
                    ? cssObj[themeObj.getSelector('dark' as unknown as 'light')]
                    : cssObj[themeObj.getSelector('light')],
              },
          }
        : {}),
    },
  };
  const gen = serializeStyles([rootStyle]);
  const css = `@layer ${PIGMENT_LAYERS.map((item) => `pigment.${item}`).join(',')};\n${gen.styles}`;
  return css;
}

export function generateThemeWithCssVars<T extends unknown>(theme?: T, prefix?: string[]): T {
  if (!theme) {
    return {} as T;
  }
  let themeObj: object;
  if (typeof theme === 'object' && theme && 'colorSchemes' in theme) {
    const themeData = theme as unknown as ThemeOptions<{}, 'light'>;
    const tokenObj = themeData.colorSchemes[themeData.defaultScheme ?? 'light'];
    themeObj = tokenObj;
  } else {
    themeObj = theme;
  }
  const result: Record<string, unknown> = {};
  iterateObject(
    themeObj as Record<string, unknown>,
    (paths, value) => {
      if (isPrimitive(value)) {
        if (typeof value === 'function') {
          setWith(result, paths, value, Object);
        } else if (typeof paths[0] === 'string' && paths[0].startsWith('$$')) {
          setWith(result, paths, value, Object);
        } else {
          setWith(result, paths, `var(--${paths.join('-')})`, Object);
        }
      }
    },
    prefix ?? undefined,
  );
  return result as T;
}

type RecursivePartial<T> = {
  [P in keyof T]?: RecursivePartial<T[P]>;
};

export type ThemeOptions<
  T extends object,
  ColorScheme extends 'light' | 'dark' = 'light' | 'dark',
> = {
  /**
   * The color schemes that the app supports.
   */
  colorSchemes: Record<ColorScheme, RecursivePartial<T>>;
  /**
   * The default color scheme to use from the `colorSchemes` object.
   */
  defaultScheme: ColorScheme;
  /**
   * A function that returns a selector for a given mode.
   * @param mode The mode to get the selector for.
   * @returns The selector for the given mode. This'll be part of the generated css.
   * @default `[data-mode="${mode}"]`
   * @example
   * ```ts
   * const theme = createTheme({
   *   modes: {
   *     default: { color: 'red' },
   *   },
   *   getSelector: (mode) => `[data-mode="${mode}"]`,
   * });
   * ```
   */
  getSelector?: (mode: ColorScheme | 'system') => string;
};
