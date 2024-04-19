import Box from '@pigment-css/react/Box';
import { jsx as _jsx } from 'react/jsx-runtime';

export function App(props) {
  return /*#__PURE__*/ _jsx(Box, {
    as: 'ul',
    'aria-label': props.label,
    sx: {
      margin: 0,
      marginBlock: '1rem',
      padding: 0,
      paddingLeft: '1.5rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem',
    },
    children: 'Hello Box',
  });
}
