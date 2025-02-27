import { css, keyframes } from '@pigment-css/core';
import { t } from '@pigment-css/theme';

const ab = 'aliceblue';

const gradientKeyframe = keyframes(({ theme }) => ({
  '50%': {
    background: 'green',
  },
}));

export const cls1 = css`
  ---flex: 1;
  color: ${({ theme }) => theme.palette.primary.main};
  font-size: ${({ theme }) => theme.size.font.h1};
  animation-name: ${gradientKeyframe};
  background-color: ${ab};
`;

export const cls2 = css(
  {
    $$flex: 21,
    $$testVar: 'red',
    border: '1px solid $$testVar',
  },
  {
    $$flex: 22,
    $$testVar1: 'red',
    border: '1px solid $$testVar1',
  },
);

export const cls3 = css({
  className: 'Test-class',
})`
  ---flex: 3;
  color: ${({ theme }) => theme.palette.primary.main};
  font-size: ${({ theme }) => theme.size.font.h1};
  background-color: ${ab};
`;

export const cls4 = css({ className: 'Test-class2' })(
  {
    $$flex: 41,
    $$testVar: 'red',
    backgroundColor: '$$testVar',
    border: `1px solid ${t('$palette.primary.main')}`,
  },
  ({ theme }) => ({
    $$flex: 42,
    color: theme.palette.primary.main,
    fontSize: theme.size.font.h1,
    backgroundColor: ab,
    variants: {
      size: {
        small: {
          $$flex: 421,
          padding: 0,
          margin: 0,
          borderColor: theme.palette.primary.main,
        },
        medium: {
          $$flex: 422,
          padding: 5,
        },
        large: {
          $$flex: 423,
          padding: 10,
        },
      },
    },
    defaultVariants: {
      size: 'medium',
    },
  }),
  ({ theme }) => `
    ---flex: 43;
    color: ${theme.palette.primary.main};
    font-size: ${theme.size.font.h1};
    background-color: ${ab};
  `,
  `
    ---flex: 44;
    color: red;
    font-size: 1rem;
    background-color: ${ab};
  `,
);

export const cls5 = css({ className: 'Test-class3' })(({ theme }) => ({
  $$flex: 51,
  $$testVar: 'red',
  backgroundColor: '$$testVar',
  border: `1px solid ${t('$palette.primary.main')}`,
  variants: {
    size: {
      small: {
        $$flex: 52,
        padding: 0,
        margin: 0,
        borderColor: theme.palette.primary.main,
      },
      medium: {
        $$flex: 53,
        padding: 5,
      },
      large: {
        $$flex: 54,
        padding: 10,
      },
    },
    color: {
      primary: {
        $$flex: 55,
        color: 'green',
      },
      secondary: {
        $$flex: 56,
        color: 'blue',
      },
    },
  },
  compoundVariants: [
    {
      size: 'small',
      color: 'primary',
      css: {
        $$flex: 57,
        borderRadius: '100%',
      },
    },
    {
      size: 'large',
      color: 'primary',
      css: {
        $$flex: 58,
        borderRadius: '100%',
      },
    },
  ],
}));

export const cls6 = css(({ theme }) => ({
  color: '$palette.main',
  backgroundColor: theme.palette.main1,
  border: `1px solid ${t('$palette.main')}`,
  variants: {
    palette: {
      primary: {
        color: 'red',
        borderColor: 'pink',
      },
      secondary: {
        color: 'red',
        borderColor: 'pink',
      },
    },
  },
  compoundVariants: [
    {
      palette: 'secondary',
      css: {
        borderWidth: 1,
      },
    },
  ],
}));
