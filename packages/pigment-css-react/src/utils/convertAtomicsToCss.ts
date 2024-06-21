import cssesc from 'cssesc';

export type Atomics = {
  conditions: Record<string, string>;
  defaultCondition: string;
  properties: {
    [key: string]: string[];
  };
  shorthands: Record<string, string[]>;
  unitless: string[];
  multipliers?: Record<string, string>;
  inlineGetters: Record<string, (value: string) => string>;
};

export type RuntimeConfig = {
  conditions: string[];
  styles: Record<string, Record<string, Record<string, string>>>;
  shorthands: Atomics['shorthands'];
  defaultCondition: string;
  unitless: string[];
  multipliers?: Record<string, string>;
  inlineGetters: Record<string, (value: string) => string>;
};

function getClassName(...items: string[]) {
  return cssesc(items.filter(Boolean).join('_'));
}

export function convertAtomicsToCss(
  {
    conditions = {},
    defaultCondition,
    properties,
    shorthands = {},
    unitless = [],
    multipliers = {},
    inlineGetters = {},
  }: Atomics,
  mainClassName: string,
  isGlobal = false,
  debug = false,
  prefix = 'Mui',
) {
  const runtimeConfig: RuntimeConfig = {
    styles: {},
    shorthands,
    conditions: Object.keys(conditions),
    defaultCondition,
    unitless,
    multipliers,
    inlineGetters,
  };
  let count = 1;
  function getCount() {
    const val = count;
    count += 1;
    return val;
  }

  const classes: {
    className: string;
    css: object;
  }[] = [];

  Object.entries(conditions).forEach(([conditionName, mediaQueryStr]) => {
    Object.entries(properties).forEach(([cssPropertyName, propertyValues]) => {
      propertyValues.forEach((propertyValue) => {
        const propValue = propertyValue.startsWith('--')
          ? cssesc(`var(${propertyValue}-${conditionName})`)
          : propertyValue;
        const className =
          isGlobal || debug
            ? getClassName(
                prefix,
                cssPropertyName,
                conditionName ?? 'default',
                propertyValue,
                !isGlobal ? mainClassName : '',
              )
            : `${mainClassName}${getCount()}`;
        if (defaultCondition === conditionName || !mediaQueryStr) {
          classes.push({
            className,
            css: {
              [cssPropertyName]: propValue,
            },
          });
        } else {
          classes.push({
            className,
            css: {
              [mediaQueryStr]: {
                [cssPropertyName]: propValue,
              },
            },
          });
        }

        if (!runtimeConfig.styles[cssPropertyName]) {
          runtimeConfig.styles[cssPropertyName] = {};
        }
        if (!runtimeConfig.styles[cssPropertyName][propertyValue]) {
          runtimeConfig.styles[cssPropertyName][propertyValue] = {};
        }
        runtimeConfig.styles[cssPropertyName][propertyValue][conditionName] = className;
      });
    });
  });

  return {
    classes,
    runtimeConfig,
  };
}
