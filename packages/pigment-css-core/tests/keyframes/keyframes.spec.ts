import { keyframes } from '../../src';

keyframes`
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

keyframes({
  className: 'loop',
})`
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

keyframes(
  {
    className: 'loop',
  },
  ({ theme }) => ({
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
  }),
);

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
