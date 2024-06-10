import { useTheme } from '@pigment-css/react';

console.log(useTheme);

export const Fade = React.forwardRef(function Fade(props, ref) {
  const theme = useTheme();
  return <div style={{ backgroundColor: theme.palette.primary.main }} />;
});
