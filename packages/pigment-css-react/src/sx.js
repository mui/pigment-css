export default function sx(transformedSx, { className, style }) {
  let sxClass = '';
  let sxVars = {};

  function iterateSx(element) {
    sxClass += ` ${typeof element === 'string' ? element : element.className}`;
    sxVars = {
      ...sxVars,
      ...(transformedSx && typeof transformedSx !== 'string' ? transformedSx.vars : undefined),
    };
  }

  if (Array.isArray(transformedSx)) {
    transformedSx.forEach((element) => {
      iterateSx(element);
    });
  } else {
    iterateSx(transformedSx);
  }

  const varStyles = {};

  if (sxVars) {
    Object.entries(sxVars).forEach(([cssVariable, [value, isUnitLess]]) => {
      if (typeof value === 'string' || isUnitLess) {
        varStyles[`--${cssVariable}`] = value;
      } else {
        varStyles[`--${cssVariable}`] = `${value}px`;
      }
    });
  }

  return {
    className: `${sxClass}${className ? ` ${className}` : ''}`,
    style: {
      ...varStyles,
      ...style,
    },
  };
}
