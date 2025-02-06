import cx from 'clsx';

/**
 * `__wyw_dynamic_import` is a special global var that is set during the evaluation phase by wyw.
 * So during eval phase, it can happen that some code is calling the runtime function.
 * We do not want to throw an error in that case as we want the evaluation to happen.
 */
export function generateAtomics() {
  if (typeof __wyw_dynamic_import !== 'undefined') {
    return;
  }
  throw new Error(
    `${process.env.PACKAGE_NAME}: You were trying to call "generateAtomics" function without configuring your bundler. Make sure to install the bundler specific plugin and use it. @pigment-css/vite-plugin for Vite integration or @pigment-css/nextjs-plugin for Next.js integration.`,
  );
}

/**
 * @typedef {Object} RuntimeConfig
 * @property {Object.<string, Object.<string, Object.<string, string>>>} styles
 * @property {Object.<string, string[]>} shorthands
 * @property {string[]} conditions
 * @property {string} defaultCondition
 * @property {string[]} unitless
 * @property {Object.<string, string>} multipliers
 */

/**
 * Given a mapping of atomic classes to css properties for each breakpoint, this function
 * returns all the classnames associated with the runtime values.
 *
 * @param {RuntimeConfig} runtimeConfig
 */
export function atomics({
  styles,
  shorthands,
  conditions,
  defaultCondition,
  unitless = [],
  multipliers = {},
  inlineGetters = {},
}) {
  function addStyles(cssProperty, propertyValue, classes, inlineStyle) {
    const styleClasses = styles[cssProperty];
    if (!styleClasses) {
      return;
    }

    function handlePrimitive(
      value,
      multiplier = undefined,
      inlineGetter = undefined,
      breakpoint = defaultCondition,
    ) {
      if (!(value in styleClasses)) {
        const keys = Object.keys(styleClasses);
        if (keys.length !== 1) {
          return;
        }
        const key = keys[0];
        let styleValue = value;
        if (typeof value === 'number') {
          if (multiplier) {
            styleValue = `calc(${value} * ${multiplier})`;
          } else if (!unitless.includes(cssProperty)) {
            styleValue = `${value}px`;
          }
        }
        classes.push(styleClasses[key][breakpoint]);
        inlineStyle[`${key}-${breakpoint}`] = inlineGetter ? inlineGetter(styleValue) : styleValue;
      } else {
        classes.push(
          typeof styleClasses[value] !== 'object'
            ? styleClasses[value]
            : styleClasses[value][breakpoint],
        );
      }
    }

    if (
      typeof propertyValue === 'string' ||
      typeof propertyValue === 'number' ||
      typeof propertyValue === 'boolean'
    ) {
      handlePrimitive(propertyValue, multipliers[cssProperty], inlineGetters[cssProperty]);
    } else if (Array.isArray(propertyValue)) {
      propertyValue.forEach((value, index) => {
        if (value !== undefined && value !== null) {
          const breakpoint = conditions[index];
          if (!breakpoint) {
            return;
          }
          handlePrimitive(
            value,
            multipliers[cssProperty],
            inlineGetters[cssProperty],
            conditions[index],
          );
        }
      });
    } else if (propertyValue) {
      Object.keys(propertyValue).forEach((condition) => {
        if (propertyValue[condition] !== undefined && propertyValue[condition] !== null) {
          const propertyClasses = styleClasses[propertyValue[condition]];
          if (!propertyClasses) {
            handlePrimitive(
              propertyValue[condition],
              multipliers[cssProperty],
              inlineGetters[cssProperty],
              condition,
            );
            return;
          }
          classes.push(propertyClasses[condition]);
        }
      });
    }
  }

  function generateClass(props) {
    const classes = [];
    const inlineStyle = {};
    Object.keys(props).forEach((cssProperty) => {
      const values = props[cssProperty];
      if (shorthands && cssProperty in shorthands) {
        const configShorthands = shorthands[cssProperty];
        if (!configShorthands) {
          return;
        }
        configShorthands.forEach((shorthand) => {
          addStyles(shorthand, values, classes, inlineStyle);
        });
      } else {
        addStyles(cssProperty, values, classes, inlineStyle);
      }
    });
    return {
      className: cx(Array.from(new Set(classes))),
      style: inlineStyle,
    };
  }
  return generateClass;
}
