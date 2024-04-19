import { sx as _sx2 } from '@pigment-css/react';
import { ForwardSx as _ForwardSx } from '@pigment-css/react/private-runtime';
import Box from '@pigment-css/react/Box';
export function App(props) {
  return (
    <_ForwardSx
      sxComponent={Box}
      as="ul"
      aria-label={props.label}
      sx={{
        className: '_c1d15y',
        vars: {
          '_c1d15y-0': [props.color, false],
        },
      }}
    >
      Hello Box
    </_ForwardSx>
  );
}
