import { globalCss } from '@pigment-css/react';

globalCss`
* {
  box-sizing: border-box;
}
@font-face {
  font-family: 'Patrick Hand SC';
  font-style: normal;
  font-weight: 400;
  color: ${({ theme }) => theme.palette.primary.main};
  src: local('Patrick Hand SC'),
    local('PatrickHandSC-Regular'),
    url(https://fonts.gstatic.com/s/patrickhandsc/v4/OYFWCgfCR-7uHIovjUZXsZ71Uis0Qeb9Gqo8IZV7ckE.woff2)
      format('woff2');
  unicode-range: U+0100-024f, U+1-1eff,
    U+20a0-20ab, U+20ad-20cf, U+2c60-2c7f,
    U+A720-A7FF;
}
`;

let inputGlobalStyles = globalCss(({ theme }) => ({
  '@keyframes mui-auto-fill': { from: { display: 'block', color: 'transparent' } },
  '@keyframes mui-auto-fill-cancel': {
    from: { display: 'block', color: theme.palette.primary.main },
  },
}));
if (typeof inputGlobalStyles === 'function') {
  inputGlobalStyles = inputGlobalStyles();
}
