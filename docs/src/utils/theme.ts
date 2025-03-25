import type { Theme } from '@pigment-css/react-new';

export function applyText(theme: Theme, value: keyof Theme['text']) {
  const val = theme.text[value];
  return {
    fontSize: val.default,
    lineHeight: val.lineHeight,
    letterSpacing: val.letterSpacing,
  };
}

export function spacing(theme: Theme, space: number | string) {
  if (typeof space === 'string') {
    return space;
  }
  return `calc(${theme.spacing} * ${space})`;
}
