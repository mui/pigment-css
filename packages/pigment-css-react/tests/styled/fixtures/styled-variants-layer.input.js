import { styled } from '@pigment-css/react';

const SliderRail = styled('span', {
  name: 'MuiSlider',
  slot: 'Rail',
})({
  color: 'red',
  variants: [
    {
      props: { color: 'primary' },
      style: {
        color: 'tomato',
      },
    },
    {
      props: ({ ownerState }) => ownerState.color === 'secondary',
      style: {
        color: 'salmon',
      },
    },
  ],
});

export const SliderOverride = styled(SliderRail)({
  color: 'blue',
  variants: [
    {
      props: { color: 'primary' },
      style: {
        color: 'indigo',
      },
    },
  ],
});
