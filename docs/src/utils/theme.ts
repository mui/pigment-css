import type { Theme } from '@pigment-css/theme';

export function applyText(theme: Theme, value: keyof Theme['text']) {
  return theme.$$utils.apply.call(theme, 'text', value);
}

export function spacing(theme: Theme, space: number | string) {
  return theme.$$utils.spacing.call(theme, space);
}
