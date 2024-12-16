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

const key1 = keyframes`
  0% {
    background: ${({ theme }) => theme.palette.main};
  }

  50% {
    background: green;
  }

  100% {
    background: ${({ theme }) => {
      // @ts-expect-error secondary does not exist on theme.
      return theme.palette.secondary.main;
    }};
  }
`;

const key2 = keyframes({
  className: 'loop',
})`
  0% {
    background: ${({ theme }) => theme.palette.main};
  }

  50% {
    background: green;
  }
`;

const key3 = keyframes(
  {
    className: 'loop1',
  },
  ({ theme }) => ({
    '0%': {
      background: theme.palette.main,
    },
    '50%': {
      background: 'green',
    },
  }),
);
