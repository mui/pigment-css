import { useTheme } from '../zero-styled';

export const Fade = React.forwardRef(function Fade(props, ref) {
  const theme = useTheme();
  return <div style={{ backgroundColor: theme.palette.primary.main }} />;
});
