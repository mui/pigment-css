import { styled as _styled2 } from '@pigment-css/react';
import _theme2 from '@pigment-css/react/theme';
import { styled as _styled } from '@pigment-css/react';
import _theme from '@pigment-css/react/theme';
const NotchedOutlineRoot = /*#__PURE__*/ _styled('fieldset', {
  name: 'MuiOutlinedInput',
  slot: 'NotchedOutline',
  overridesResolver: (props, styles) => styles.notchedOutline,
})({
  classes: ['njazm0b', 'njazm0b-1'],
});
const OutlinedInputInput = /*#__PURE__*/ _styled2('input', {
  name: 'MuiOutlinedInput',
  slot: 'Input',
})({
  classes: ['o8d5r3t', 'o8d5r3t-1'],
  variants: [
    {
      props: {
        size: 'small',
      },
      className: 'o8d5r3t-2',
    },
    {
      props: ({ ownerState }) => ownerState.multiline,
      className: 'o8d5r3t-3',
    },
    {
      props: ({ ownerState }) => ownerState.startAdornment,
      className: 'o8d5r3t-4',
    },
    {
      props: ({ ownerState }) => ownerState.endAdornment,
      className: 'o8d5r3t-5',
    },
  ],
});
