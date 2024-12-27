import { keyframes } from '@pigment-css/core';

const rotateKeyframe = keyframes({
  from: {
    transform: 'rotate(360deg)',
  },
  to: {
    transform: 'rotate(0deg)',
  },
});

const rotateKeyframe2 = keyframes({ className: 'rotate' })`
  from {
    transform: rotate(360deg);
  }

  to {
    transform: rotate(0deg);
  }
`;
