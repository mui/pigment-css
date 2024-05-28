import { sx as _sx } from '@pigment-css/react';
import Box from '@pigment-css/react/Box';
export function App(props) {
  return (
    <Box
      as="ul"
      aria-label={props.label}
      {..._sx(
        {
          className: 'b1akj7oz',
          vars: {
            'b1akj7oz-0': [props.color, false],
          },
        },
        {},
      )}
    >
      Hello Box
    </Box>
  );
}
