import cx from 'clsx';

export function generateAtomics() {
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
 * @property {string} multiplier
 */

/**
 * @param {RuntimeConfig} runtimeConfig
 */
export function atomics({
  styles,
  defaultCondition,
  shorthands,
  conditions,
  unitless,
  multiplier = 1,
}) {
  function addStyles(cssProperty, values, classes, inlineStyle) {
    const styleClasses = styles[cssProperty];
    if (!styleClasses) {
      return;
    }
    // dynamic values
    if (!(values in styleClasses)) {
      const keys = Object.keys(styleClasses);
      if (keys.length !== 1) {
        return;
      }
      const key = keys[0];
      if (typeof values === 'string' || typeof values === 'number') {
        const value = typeof values === 'number' ? values * multiplier : values;
        classes.push(styleClasses[key].$$default);
        inlineStyle[`${key}_${defaultCondition}`] = unitless.includes(cssProperty)
          ? value
          : `${value}px`;
      } else if (Array.isArray(values)) {
        values.forEach((itemValue, index) => {
          const breakpoint = conditions[index];
          classes.push(styleClasses[key][breakpoint]);
          const value = typeof itemValue === 'number' ? itemValue * multiplier : itemValue;
          inlineStyle[`${key}_${breakpoint}`] = unitless.includes(cssProperty)
            ? value
            : `${value}px`;
        });
      } else {
        Object.keys(values).forEach((condition) => {
          const propertyClasses = styleClasses[key];
          if (!propertyClasses) {
            return;
          }
          console.log(propertyClasses);
          classes.push(propertyClasses[condition]);
          const value =
            typeof values[condition] === 'number'
              ? values[condition] * multiplier
              : values[condition];
          inlineStyle[`${key}_${condition}`] = unitless.includes(cssProperty)
            ? value
            : `${value}px`;
        });
      }
      return;
    }
    if (typeof values === 'string' || typeof values === 'number') {
      classes.push(styleClasses[values].$$default);
    } else if (Array.isArray(values)) {
      values.forEach((value, index) => {
        classes.push(styleClasses[value][conditions[index]]);
      });
    } else {
      Object.keys(values).forEach((condition) => {
        const propertyClasses = styleClasses[values[condition]];
        if (!propertyClasses) {
          return;
        }
        classes.push(propertyClasses[condition]);
      });
    }
  }

  function generateClass(props) {
    const classes = [];
    const inlineStyle = {};
    const runtimeStyles = props;
    Object.keys(runtimeStyles).forEach((cssProperty) => {
      const values = runtimeStyles[cssProperty];
      if (cssProperty in shorthands) {
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
