export default function sx(transformedSx, { className, style }) {
  const sxClass = typeof transformedSx === 'string' ? transformedSx : transformedSx?.className;
  const sxVars =
    transformedSx && typeof transformedSx !== 'string' ? transformedSx.vars : undefined;
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
