import { useTheme } from '@pigment-css/react';

// This is intentional to make sure Pigment leaves the reference as-is.
console.log(useTheme);

export const Fade = React.forwardRef(function Fade(props, ref) {
  const theme = useTheme();
  return <div style={{ backgroundColor: theme.palette.primary.main }} />;
});
