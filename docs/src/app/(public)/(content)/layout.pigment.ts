import { t } from '@pigment-css/theme';
import { styled } from '@pigment-css/react-new';

export const Root = styled.div(({ theme }) => ({
  $sidebarWidth: '17.5rem',
  display: 'grid',
  alignItems: 'start',
  paddingTop: t('$header.height'),
  paddingInline: '1.5rem',
  gridTemplateColumns: '1fr',
  [theme.$$breakpoints.gt('sm')]: {
    paddingInline: '2.5rem',
  },
  [theme.$$breakpoints.gt('lg')]: {
    paddingTop: 0,
    paddingInline: 0,
    gridTemplateColumns: '$sidebarWidth 1fr 3rem',
  },
  [theme.$$breakpoints.gt('quickNav')]: {
    gridTemplateColumns: '$sidebarWidth 1fr $sidebarWidth',
  },
}));

export const Main = styled.div(({ theme }) => ({
  minWidth: 0,
  maxWidth: '48rem',
  width: '100%',
  paddingTop: '1.5rem',
  paddingBottom: '5rem',
  margin: '0 auto',
  [theme.$$breakpoints.gt('sm')]: {
    paddingTop: '2rem',
  },
  [theme.$$breakpoints.gt('lg')]: {
    margin: 0,
  },
  [theme.$$breakpoints.gt('quickNav')]: {
    margin: 0,
  },
}));
