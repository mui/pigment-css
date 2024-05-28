import { styled as _styled } from '@pigment-css/react';
import _theme from '@pigment-css/react/theme';
const OutlinedInputInput = /*#__PURE__*/ _styled('input', {
  name: 'MuiOutlinedInput',
  slot: 'Input',
})({
  classes: ['oqpebcq', 'oqpebcq-5'],
  variants: [
    {
      props: {
        size: 'small',
      },
      className: 'oqpebcq-1',
    },
    {
      props: ({ ownerState }) => ownerState.multiline,
      className: 'oqpebcq-2',
    },
    {
      props: ({ ownerState }) => ownerState.startAdornment,
      className: 'oqpebcq-3',
    },
    {
      props: ({ ownerState }) => ownerState.endAdornment,
      className: 'oqpebcq-4',
    },
    {
      props: {
        size: 'small',
      },
      className: 'oqpebcq-6',
    },
  ],
});
