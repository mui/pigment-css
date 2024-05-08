import { styled } from '@pigment-css/react';

const OutlinedInputInput = styled('input', {
  name: 'MuiOutlinedInput',
  slot: 'Input',
})({
  padding: '16.5px 14px',
  variants: [
    {
      props: {
        size: 'small',
      },
      style: {
        padding: '8.5px 14px',
      },
    },
    {
      props: ({ ownerState }) => ownerState.multiline,
      style: {
        padding: 0,
      },
    },
    {
      props: ({ ownerState }) => ownerState.startAdornment,
      style: {
        paddingLeft: 0,
      },
    },
    {
      props: ({ ownerState }) => ownerState.endAdornment,
      style: {
        paddingRight: 0,
      },
    },
  ],
});
