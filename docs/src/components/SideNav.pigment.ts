import { t } from '@pigment-css/theme';
import { styled } from '@pigment-css/react-new';
import { ScrollArea } from '@base-ui-components/react/scroll-area';

import { applyText } from '../utils/theme';
import Link from 'next/link';

export const Root = styled.nav(({ theme }) => ({
  $sideNavItemHeight: '2rem',
  $sideNavItemLineHeight: '$text.md.lineHeight',
  $sideNavItemPaddingY: 'calc($sideNavItemHeight / 2 - $sideNavItemLineHeight / 2)',
  $sideNavScrollbarThumbWidth: '0.25rem',
  $sideNavScrollbarWidth: '1.5rem',
  $sideNavScrollbarGapLeft: '1rem',
  $sideNavScrollbarGapRight: '2.5rem',
  marginRight:
    'calc($sideNavScrollbarGapRight - $sideNavScrollbarWidth / 2 + $sideNavScrollbarThumbWidth / 2)',
  ...applyText(theme, 'md'),
  position: 'sticky',
  top: 0,
  display: 'none',

  [theme.$$breakpoints.gt('lg')]: {
    display: 'block',
  },
}));

export const ViewPort = styled(ScrollArea.Viewport)`
  max-height: 100vh;
  padding-top: 0.75rem;
  padding-bottom: 3rem;
  padding-left: 1.5rem;
  padding-right: calc(
    var(--sideNavScrollbarGapLeft) + var(--sideNavScrollbarWidth) / 2 +
      var(--sideNavScrollbarThumbWidth) / 2
  );

  /* Scroll containers are focusable */
  outline: 0;

  ${Root}:has(&:focus-visible)::before {
    content: '';
    inset: 0;
    pointer-events: none;
    position: absolute;
    outline: 2px solid ${t('$color.blue')};
    outline-offset: -2px;
    /* Don't inset the outline on the right */
    right: -2px;
  }
`;

export const ScrollBar = styled(ScrollArea.Scrollbar)`
  display: flex;
  padding-top: 1.5rem;
  padding-bottom: 3rem;

  /* Click target width */
  width: var(--sideNavScrollbarWidth);

  opacity: 0;
  transition: opacity 200ms 500ms;

  &:active,
  &[data-scrolling],
  ${ViewPort}:focus-visible + & {
    transition-duration: 0ms;
    transition-delay: 0ms;
    opacity: 1;
  }
`;

export const ScrollBarThumb = styled(ScrollArea.Thumb)`
  display: flex;
  justify-content: center;
  width: 100%;

  &::before {
    content: '';
    display: block;
    height: 100%;
    /* Visible thumb width */
    width: var(--sideNavScrollbarThumbWidth);
    border-radius: ${t('$radius.sm')};
    background-color: ${t('$color.gray.400')};
  }
`;

export const Section = styled.div`
  margin-bottom: 1rem;
`;

export const Heading = styled.div`
  display: inline-flex;
  padding-block: var(--sideNavItemPaddingY);
  font-weight: 500;
`;

export const NavItem = styled.li`
  display: flex;
`;

export const NavLink = styled(Link)`
  flex-grow: 1;
  padding: calc(var(--sideNavItemPaddingY) - 1px) 0.75rem;
  border-block: 1px solid transparent; /* Maintain a 1px gap between active an inactive item */
  background-clip: padding-box;
  border-radius: ${t('$radius.md')};
  letter-spacing: 0.0025em;

  @media (hover: hover) {
    &:hover {
      background-color: ${t('$color.gray.50')};
    }
  }

  &[data-active] {
    border: none;
    padding: var(--sideNavItemPaddingY) 0.75rem;
    background-color: ${t('$color.gray.50')};
    outline: 1px solid ${t('$color.gray.200')};
    outline-offset: -1px;
    font-weight: 500;
    letter-spacing: -0.0025em;
    word-spacing: -0.005em;
    cursor: default;
  }

  &:focus-visible {
    z-index: 1;
    outline: 2px solid ${t('$color.blue')};
    outline-offset: -1px;
  }
`;
