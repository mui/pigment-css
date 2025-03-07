import { styled } from '@pigment-css/react-new';
import { spacing } from 'docs/utils/theme';

export const AlertRoot = styled.blockquote(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: spacing(theme, 2),
  padding: '6px 16px',
  $alertColor: theme.color.yellow,
  border: '.5px solid $alertColor',
  borderLeftWidth: 4,
  borderRadius: theme.radius.md,
  marginBottom: spacing(theme, 4),
  color: '$alertColor',
  '& p': {
    marginBottom: spacing(theme, 1),
  },
  variants: {
    variant: {
      info: {
        $alertColor: theme.color.violet,
      },
      important: {
        $alertColor: theme.color.yellow,
      },
      tip: {
        $alertColor: theme.color.green,
      },
      note: {
        $alertColor: theme.color.blue,
      },
    },
  },
  defaultVariants: {
    variant: 'info',
  },
}));

export const AlertTitle = styled.header(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: spacing(theme, 2),
  textTransform: 'capitalize',
}));
