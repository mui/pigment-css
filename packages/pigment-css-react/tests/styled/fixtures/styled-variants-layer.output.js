import { styled as _styled2 } from '@pigment-css/react';
import _theme2 from '@pigment-css/react/theme';
import { styled as _styled } from '@pigment-css/react';
import _theme from '@pigment-css/react/theme';
const SliderRail = /*#__PURE__*/ _styled('span', {
  name: 'MuiSlider',
  slot: 'Rail',
})({
  classes: ['srxh6zy', 'srxh6zy-3'],
  variants: [
    {
      props: {
        color: 'primary',
      },
      className: 'srxh6zy-1',
    },
    {
      props: ({ ownerState }) => ownerState.color === 'secondary',
      className: 'srxh6zy-2',
    },
  ],
});
const _exp3 = /*#__PURE__*/ () => SliderRail;
export const SliderOverride = /*#__PURE__*/ _styled2(_exp3())({
  classes: ['s1q936we'],
  variants: [
    {
      props: {
        color: 'primary',
      },
      className: 's1q936we-1',
    },
  ],
});
