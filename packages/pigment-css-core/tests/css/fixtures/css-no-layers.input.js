import { css, keyframes } from '@pigment-css/core';

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
