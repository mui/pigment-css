import { t } from '@pigment-css/theme';
import { keyframes } from '../../src';

declare module '@pigment-css/theme' {
  interface Theme {
    palette: {
      main: string;
    };
  }
}

keyframes(
  ({ theme }) => `
  0% {
    background: ${theme.palette.main};
  }

  50% {
    background: green;
  }

  100% {
    background: ${
      // @ts-expect-error secondary does not exist on theme.
      theme.palette.secondary.main
    };
  }
`,
);

const res = keyframes({
  className: 'loop',
})(
  ({ theme }) => `
  0% {
    background: ${theme.palette.main};
  }

  50% {
    background: green;
  }

  100% {
    background: ${
      // @ts-expect-error secondary does not exist on theme.
      theme.palette.secondary.main
    };
  }
`,
);

keyframes({
  className: 'loop',
})({
  '0%': {
    background: t('$palette.main'),
  },
  '50%': {
    background: 'green',
  },
  '100%': {
    // @ts-expect-error secondary does not exist on theme.
    background: theme.palette.secondary.main,
  },
});

keyframes(({ theme }) => ({
  '0%': {
    background: theme.palette.main,
  },
  '50%': {
    background: 'green',
  },
  '100%': {
    // @ts-expect-error secondary does not exist on theme.
    background: theme.palette.secondary.main,
  },
}));
