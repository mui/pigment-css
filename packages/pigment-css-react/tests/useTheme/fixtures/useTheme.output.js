import _default from '@pigment-css/react/theme';
import { useTheme } from '@pigment-css/react';
console.log(useTheme);
export const Fade = React.forwardRef(function Fade(props, ref) {
  const theme = _default;
  return (
    <div
      style={{
        backgroundColor: theme.palette.primary.main,
      }}
    />
  );
});
