import { styled } from '@pigment-css/react-new';

export const Root = styled.div(({ theme }) => ({
  $rootLayoutPaddingX: '0rem',
  isolation: 'isolate',
  zIndex: 0,
  position: 'relative',
  paddingInline: '$rootLayoutPaddingX',
  [theme.$$breakpoints.gt('lg')]: {
    $rootLayoutPaddingX: '3rem',

    '&::before, &::after': {
      content: '""',
      position: 'absolute',
      backgroundColor: theme.color.gridline,
      height: 1,
      right: 0,
      left: 0,
    },
    '&::before': {
      top: theme.header.height,
      marginTop: -1,
    },
    '&::after': {
      bottom: theme.header.height,
      marginBottom: -1,
    },
  },
}));

export const Container = styled.div(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  marginInline: 'auto',
  minHeight: '100dvh',
  maxWidth: `calc(${theme.breakpoint.maxLayoutWidth} - $rootLayoutPaddingX * 2)`,
  [theme.$$breakpoints.gt('lg')]: {
    paddingBlock: theme.header.height,

    '&::before, &::after': {
      content: '""',
      position: 'absolute',
      top: 0,
      bottom: 0,
      width: 1,
      backgroundColor: theme.color.gridline,
    },
    '&::before': {
      left: 0,
      marginLeft: -1,
    },
    '&::after': {
      right: 0,
      marginRight: -1,
    },
  },
}));

export const Content = styled.div({
  display: 'flex',
  flexGrow: 1,
  flexDirection: 'column',
  backgroundColor: '$color.content',
});
