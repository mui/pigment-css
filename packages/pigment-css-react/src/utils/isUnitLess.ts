import unitlessKeys from '@emotion/unitless';

export function isUnitLess(cssKey: string) {
  return unitlessKeys[cssKey] === 1 || cssKey.startsWith('--');
}
