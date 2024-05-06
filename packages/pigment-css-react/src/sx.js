export default function sx(transformedSx, { className, style }) {
  let sxClass = '';
  let sxVars = {};

  function iterateSx(element) {
    if (element) {
      sxClass += `${typeof element === 'string' ? element : element.className} `;
      sxVars = {
        ...sxVars,
        ...(element && typeof element !== 'string' ? element.vars : undefined),
      };
    }
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
    className: `${sxClass.trim()}${className ? ` ${className}` : ''}`,
    style: {
      ...varStyles,
      ...style,
    },
  };
}
