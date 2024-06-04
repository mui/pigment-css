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
 * Given a mapping of atomic classes to css properties for each breakpoint, this function
 * returns all the classnames associated with the runtime values.
 *
 * @param {RuntimeConfig} runtimeConfig
 */
export function atomics({ styles, shorthands, conditions, unitless, multiplier = 1 }) {
  function addStyles(cssProperty, propertyValue, classes, inlineStyle) {
    const styleClasses = styles[cssProperty];
    if (!styleClasses) {
      return;
    }

    function handlePrimitive(value, breakpoint = '$$default') {
      if (!(value in styleClasses)) {
        const keys = Object.keys(styleClasses);
        if (keys.length !== 1) {
          return;
        }
        const key = keys[0];
        const styleValue = typeof value === 'number' ? value * multiplier : value;
        classes.push(styleClasses[key][breakpoint]);
        inlineStyle[`${key}_${breakpoint}`] = unitless.includes(cssProperty)
          ? styleValue
          : `${styleValue}px`;
      } else {
        classes.push(styleClasses[value][breakpoint]);
      }
    }

    if (typeof propertyValue === 'string' || typeof propertyValue === 'number') {
      handlePrimitive(propertyValue);
    } else if (Array.isArray(propertyValue)) {
      propertyValue.forEach((value, index) => {
        const breakpoint = conditions[index];
        if (!breakpoint) {
          return;
        }
        handlePrimitive(value, conditions[index]);
      });
    } else {
      Object.keys(propertyValue).forEach((condition) => {
        const propertyClasses = styleClasses[propertyValue[condition]];
        if (!propertyClasses) {
          handlePrimitive(propertyValue[condition], condition);
          return;
        }
        handlePrimitive(propertyClasses[condition], condition);
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
