import unitlessKeys from '@emotion/unitless';
import cssesc from 'cssesc';
import { serializeStyles } from '@emotion/serialize';

type ExtendedStyleObj = {
  variants?: Record<string, Record<string, object>>;
  compoundVariants?: Array<
    {
      [key: string]: string | number;
    } & { css: Object | string }
  >;
  defaultVariants?: Record<string, string | number>;
};
type BaseStyleObject = ExtendedStyleObj & Record<string, string | object>;

function isUnitLess(cssKey: string) {
  return unitlessKeys[cssKey] === 1;
}

export type ProcessStyleOptions = {
  getVariableName: () => string;
};

export type ProcessStyleReturn<T> = {
  result: T;
  variables: Record<string, [Function, 1 | 0]>;
};

export type ProcessStyleObjectsOptions = ProcessStyleOptions & {
  getClassName: (
    variantName: string | undefined,
    variantValue: string | undefined,
    isCv?: boolean,
  ) => string;
};

export type StyleObjectReturn = {
  className: string;
  cssText: string;
  /**
   * Generated css vars to embed into the style prop
   */
  variables: Record<string, [Function, 1 | 0]>;
  /**
   * The object value to be translated back to the output AST and made part of the function call.
   */
  serializables: Record<string, string | number>;
};

export type ProcessStyleObjectsReturn = {
  base: StyleObjectReturn[];
  variants: StyleObjectReturn[];
  compoundVariants: StyleObjectReturn[];
};

function splitAndJoin(str: string): string {
  return str.split('.').join('-');
}

function getCSSVar(key: string, wrapInVar = false): string {
  let result: string;
  if (key.startsWith('$$')) {
    result = `---${cssesc(splitAndJoin(key.substring(2)))}`;
  } else if (key.startsWith('$')) {
    result = `--${cssesc(splitAndJoin(key.substring(1)))}`;
  } else {
    result = `--${cssesc(splitAndJoin(key))}`;
  }
  if (wrapInVar) {
    return `var(${result})`;
  }
  return result;
}

function transformProbableCssVar(value: string): string {
  const variableRegex = /(\$\$?\w[\d+\w+.]{0,})/g;
  return value.replaceAll(variableRegex, (sub) => {
    return getCSSVar(sub, true);
  });
}

/**
 * Iterates and converts all the $$ css variables (in both keys and values) to native CSS var.
 * Also converts all the values that are function to a css variable.
 */
export function processStyle<T extends object>(
  t: T,
  options: ProcessStyleOptions,
): ProcessStyleReturn<T> {
  const result: Record<string, string | number | object> = {};
  let variables: ProcessStyleReturn<T>['variables'] = {};

  Object.entries(t).forEach(([key, value]) => {
    let newKey = key;
    if (key.startsWith('$')) {
      newKey = getCSSVar(key);
    }
    if (typeof value === 'string') {
      result[newKey] = transformProbableCssVar(value);
    } else if (typeof value === 'number' || value === null) {
      result[newKey] = value;
    } else if (typeof value === 'object') {
      if (Array.isArray(value)) {
        result[newKey] = value;
      } else {
        const nestedResult = processStyle(value, options);
        result[newKey] = nestedResult.result;
        variables = {
          ...nestedResult.variables,
          ...variables,
        };
      }
    } else if (typeof value === 'function') {
      const variableRaw = getCSSVar(cssesc(options.getVariableName()));
      variables[variableRaw] = [value, isUnitLess(newKey) ? 1 : 0];
      result[newKey] = `var(${variableRaw})`;
    }
  });
  return {
    result: result as T,
    variables,
  };
}

/**
 * Actual transformation call to be done by either `css()` or `styled()` APIs to convert the passed
 * style object to css string. It handles all the variant transformations as well.
 */
function getCss(
  style: string | BaseStyleObject,
  { getClassName, getVariableName }: ProcessStyleObjectsOptions,
): ProcessStyleObjectsReturn {
  const result: ProcessStyleObjectsReturn = {
    base: [],
    variants: [],
    compoundVariants: [],
  };
  if (typeof style === 'string') {
    result.base.push({
      cssText: serializeStyles([style]).styles,
      className: cssesc(getClassName(undefined, undefined)),
      variables: {},
      serializables: {},
    });
    return result;
  }
  const { variants, compoundVariants } = style;
  delete style.variants;
  delete style.compoundVariants;
  delete style.defaultVariants;

  const { result: baseObj, variables } = processStyle(style, { getVariableName });
  const cssText = serializeStyles([baseObj as any]).styles;
  result.base.push({
    className: getClassName(undefined, undefined),
    cssText,
    variables,
    serializables: {},
  });

  if (variants) {
    Object.keys(variants).forEach((variantName) => {
      const variantData = variants[variantName];
      Object.keys(variantData).forEach((variantValue) => {
        const cssObjOrStr = variantData[variantValue];
        const className = getClassName(variantName, variantValue);
        const serializables = {
          [variantName]: variantValue,
        };
        if (typeof cssObjOrStr === 'string') {
          result.variants.push({
            className,
            cssText: serializeStyles([cssObjOrStr]).styles,
            variables: {},
            serializables,
          });
        } else {
          const { result: cssObj, variables: variantVariables } = processStyle(cssObjOrStr, {
            getVariableName,
          });
          result.variants.push({
            className,
            serializables,
            variables: variantVariables,
            cssText: serializeStyles([cssObj as any]).styles,
          });
        }
      });
    });
  }
  if (compoundVariants && compoundVariants.length > 0) {
    compoundVariants.forEach(({ css, ...rest }, cvIndex) => {
      const className = `${getClassName(undefined, undefined, true)}-cv${cvIndex ? `-${cvIndex}` : ''}`;
      const serializables = rest;
      if (typeof css === 'string') {
        result.compoundVariants.push({
          className,
          cssText: serializeStyles([css]).styles,
          variables: {},
          serializables,
        });
      } else {
        const { result: cssObj, variables: variantVariables } = processStyle(css, {
          getVariableName,
        });
        result.compoundVariants.push({
          className,
          serializables,
          variables: variantVariables,
          cssText: serializeStyles([cssObj as any]).styles,
        });
      }
    });
  }
  return result;
}

/**
 * Actual function to be called by processors with all the passed styles.
 */
export function processStyleObjects(
  styles: Array<BaseStyleObject | string>,
  options: ProcessStyleObjectsOptions,
): ProcessStyleObjectsReturn {
  const result: ProcessStyleObjectsReturn = {
    base: [],
    variants: [],
    compoundVariants: [],
  };

  styles.reduce((acc, style, index) => {
    const res = getCss(style, {
      ...options,
      getClassName: (
        variantName: string | undefined,
        variantValue: string | undefined,
        isCv?: boolean,
      ) => {
        const base = options.getClassName(variantName, variantValue);
        if (index > 0) {
          return `${base}${isCv ? '-cv' : ''}-${index}`;
        }
        return base;
      },
    });
    acc.base.push(...res.base);
    acc.variants.push(...res.variants);
    acc.compoundVariants.push(...res.compoundVariants);
    return acc;
  }, result);
  return result;
}

export { cssesc, serializeStyles };
