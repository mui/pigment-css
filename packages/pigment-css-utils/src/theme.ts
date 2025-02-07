import { serializeStyles } from '@emotion/serialize';
import setWith from 'lodash/setWith';

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
        cssVars[`--${paths.join('-')}`] = (value as string).toString();
      }
    },
    prefix ? [prefix] : undefined,
  );
  return cssVars;
}

export function generateCssFromTheme(theme?: unknown, prefix = '') {
  const cssVars = theme ? generateVars(theme as Theme, prefix) : {};
  const rootStyle = {
    ':root': cssVars,
  };
  const gen = serializeStyles([rootStyle]);
  const css = `@layer ${PIGMENT_LAYERS.map((item) => `pigment.${item}`).join(',')};
${gen.styles}`;
  return css;
}

export function generateThemeWithCssVars<T extends unknown>(theme?: T, prefix?: string[]): T {
  if (!theme) {
    return {} as T;
  }
  const result: Record<string, unknown> = {};
  iterateObject(
    theme,
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
