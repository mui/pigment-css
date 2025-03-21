import { styled, t } from '@pigment-css/react-new';
import { applyText } from '../utils/theme';

export const Container = styled.div`
  padding: 0;
  position: relative;
`;

export const Root = styled.nav(({ theme }) => ({
  $quickNavMarginX: '2rem',
  /* Use line height instead of fixed item height in case text breaks into multiple lines */
  $quickNavItemHeight: '2rem',
  $quickNavItemLineHeight: t('$text.md.lineHeight'),
  $quickNavItemPaddingY: 'calc($quickNavItemHeight / 2 - $quickNavItemLineHeight / 2)',
  /* The variable is used in JS positioning logic */
  $top: '-1px',
  $marginTop: '5.75rem' /* Match hero code block top */,
  ...applyText(theme, 'md'),
  zIndex: 1,
  position: 'sticky',
  top: '$top',
  marginTop: '$marginTop',
  width: 0,
  float: 'right',
  contain: 'layout',
  display: 'none',
  [theme.breakpoints.gt('quickNav')]: {
    display: 'block',
  },
  [theme.breakpoints.lt('quickNav')]: {
    float: 'none',
  },
  '[dir="rtl"] &': {
    float: 'left',
  },
}));

export const Inner = styled.div`
  border-top: 1px solid ${t('$color.gray.200')};
  position: relative;
  left: ${'$quickNavMarginX'};
  padding-top: 0.75rem;
  padding-bottom: 2.5rem;
  width: calc(${'$sidebarWidth'} - ${'$quickNavMarginX'} * 2);

  [dir='rtl'] & {
    left: auto;
    right: ${'$quickNavMarginX'};
  }
`;

export const Title = styled.header`
  padding-block: ${'$quickNavItemPaddingY'};
  font-weight: 500;
`;

export const List = styled.ul`
  color: ${t('$color.gray.0')};
  display: flex;
  flex-direction: column;
  align-items: start;

  & & {
    padding-inline-start: 0.75rem;
  }
`;

export const Link = styled.a`
  display: flex;
  padding: ${'$quickNavItemPaddingY'} 0.5rem;
  margin-inline: -0.5rem;

  &:focus-visible {
    color: ${t('$color.foreground')};
    outline: 2px solid ${t('$color.blue')};
    outline-offset: -2px;
    border-radius: ${t('$radius.sm')};
  }

  @media (hover: hover) {
    &:hover {
      text-decoration: underline;
      text-underline-offset: 2px;
      text-decoration-thickness: 1px;
      text-decoration-color: ${t('$color.gray.500')};
    }
  }
`;
