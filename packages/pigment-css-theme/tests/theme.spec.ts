import { t } from '../src';

const theme = {
  gray: {
    surface: {
      1: 'hsl(0 0% 99%)',
      100: 'hsl(0 0% 99%)',
      '2': 'hsl(0 0% 97.5%)',
    },
  },
  br: {
    circle: '50%',
    pill: '9999px',
  },
};

type UserTheme = typeof theme;

declare module '../src' {
  interface Theme extends UserTheme {}
}

t('$gray.surface.1');
t('$gray.surface.100');
t('$gray.surface.2');
// @ts-expect-error 3 does not exist
t('$gray.surface.3');
t('$br.circle');
// @ts-expect-error circle1 does not exist
t('$br.circle1');

// @ts-expect-error
t('$palette.secondary');
