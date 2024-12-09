import { keyframes } from '@pigment-css/core';

const green = 'green';

const gradientKeyframe = keyframes(({ theme }) => ({
  '0%': {
    background: theme.palette.primary.main,
  },
  '50%': {
    background: green,
  },
  '100%': {
    background: theme.palette.secondary.main,
  },
}));

const gradientKeyframe2 = keyframes`
  0% {
    background: ${({ theme }) => theme.palette.primary.main};
  }

  50% {
    background: ${green};
  }

  100% {
    background: ${({ theme }) => theme.palette.secondary.main};
  }
`;

// simulate CssBaseline transpiled by Next.js
export const styles = (theme) => ({
  '0%': {
    background: theme.palette.primary.main,
  },
  '50%': {
    background: green,
  },
  '100%': {
    background: theme.palette.secondary.main,
  },
});
const gradientKeyframe3 = keyframes((_c = ({ theme }) => styles(theme)));
var _c;
