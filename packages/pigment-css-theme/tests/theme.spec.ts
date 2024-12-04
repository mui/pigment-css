import { t } from '../src';

declare module '../src' {
  interface Theme {
    palette: {
      main: string;
    };
  }
}

t('$palette.main');

// @ts-expect-error
t('$palette.secondary');
