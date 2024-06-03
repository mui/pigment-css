import _default from '@pigment-css/react/theme';
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
