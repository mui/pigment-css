import { styled } from '@pigment-css/react';

const NotchedOutlineRoot = styled('fieldset', {
  name: 'MuiOutlinedInput',
  slot: 'NotchedOutline',
  overridesResolver: (props, styles) => styles.notchedOutline,
})({
  borderColor: 'red',
});
