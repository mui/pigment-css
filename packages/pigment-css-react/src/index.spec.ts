import { css, globalCss, keyframes, styled, sx } from '@pigment-css/react';

declare module '@pigment-css/react/theme' {
  interface ThemeArgs {
    theme: {
      palette: {
        primary: {
          main: string;
        };
      };
    };
  }
}

css``;
css({
  color: 'red',
});

globalCss`
  html {
    font-size: 16px;
  }
`;
globalCss(({ theme }) => ({
  body: {
    color: theme.palette.primary.main,
  },
}));

keyframes``;
keyframes(() => ({
  from: {
    opacity: 0,
  },
  to: {
    opacity: 1,
  },
}));

styled.div``;
styled.div(({ theme }) => ({
  color: theme.palette.primary.main,
}));

sx({ color: 'red' });
sx((theme) => ({
  color: theme.palette.primary.main,
}));
sx([
  { color: 'red' },
  (theme) => ({
    color: theme.palette.primary.main,
  }),
]);
const foo = true;
sx([
  true && { color: 'red' },
  foo
    ? (theme) => ({
        color: theme.palette.primary.main,
      })
    : {
        color: 'blue',
      },
]);
