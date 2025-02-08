import { t } from '@pigment-css/theme';
import { css } from '@pigment-css/react-new';
import { applyText } from '../utils/theme';

export const backdrop = css`
  position: fixed;
  inset: 0;
  height: 100dvh;
  transition-duration: 600ms;
  transition-property: -webkit-backdrop-filter, backdrop-filter, opacity;
  transition-timing-function: ${t('$ease.out.fast')};
  backdrop-filter: blur(1.5px);
  background-image: linear-gradient(to bottom, transparent 2rem, rgb(0 0 0 / 5%) 50%);

  @media (prefers-color-scheme: dark) {
    background-image: linear-gradient(to bottom, transparent, rgb(0 0 0 / 25%) 6rem);
  }

  &[data-starting-style],
  &[data-ending-style] {
    backdrop-filter: blur(0);
    opacity: 0;
  }

  &[data-ending-style] {
    transition-duration: 250ms;
    transition-timing-function: ${t('$ease.in.slow')};
  }
`;

export const backdropTapArea = css`
  position: absolute;
  inset: 0;
`;

export const popup = css`
  position: fixed;
  height: 100dvh;
  inset: 0;
  outline: 0;

  /* Half the transition duration for blur so the element sort of comes into the focus when it's halfway in */
  transition-duration: 600ms, 300ms;
  transform-origin: top center;
  transition-property: transform, filter;
  transition-timing-function: ${t('$ease.out.fast')};

  &[data-starting-style],
  &[data-ending-style] {
    transform: translateY(100dvh);
    filter: blur(1px);
  }

  &[data-ending-style] {
    /* Delay the blur transition so it doesn't feel unfocused until halway out */
    transition-delay: 0ms, 125ms;
    transition-duration: 250ms;
    transition-timing-function: ${t('$ease.in.slow')};
  }
`;

export const viewport = css(({ theme }) => ({
  $mobileNavItemHeight: '2.5rem',
  $mobileNavItemPaddingX: '1.5rem',

  position: 'absolute',
  inset: '0',
  height: '100dvh',
  overflowY: 'auto',
  ...applyText(theme, 'base'),

  /* Native apps don't show scrollbars on sheets like this */
  scrollbarWidth: 'none',
  '&::-webkit-scrollbar': {
    display: 'none',
  },

  /* A decorative border between the status bar and the page */
  '&::after': {
    content: '',
    position: 'fixed',
    zIndex: '1',
    top: '0',
    insetInline: '0',
    height: '1px',
    transition: 'background-color 50ms',
  },

  '&[data-clipped]::after': {
    backgroundColor: theme.color.gridline,
  },
}));

export const viewportInner = css`
  position: relative;

  /* Prevent children's margin collapse */
  display: flex;
  flex-direction: column;
`;

export const overscroll = css(
  ({ theme }) => `
  position: absolute;
  inset: 0;
  background-image: linear-gradient(to bottom, transparent 30%, ${t('$color.popup')} 50%);

  ${theme.$$breakpoints.lt('sm')} {
    display: none;
  }
`,
);

export const navPanel = css(
  ({ theme }) => `
    margin-top: ${theme.header.height};
    position: relative;
    padding-block: 1rem;

    border-top-left-radius: ${theme.radius.xl};
    border-top-right-radius: ${theme.radius.xl};

    box-shadow:
      0 10px 64px -10px rgb(36 40 52 / 20%),
      0 0.25px 0 1px ${theme.color.gray['200']};

    @media (prefers-color-scheme: dark) {
      box-shadow: 0 0 0 1px ${theme.color.gray['200']};
    }

    /* Make bottom overscroll edges soft; visible during extreme rubber band overscroll at the bottom */
    background-image: linear-gradient(to bottom, ${theme.color.popup} calc(100% - 2rem), transparent);

    /* Make the panel narrower on wider screens and lose the overscroll gradient hocus pocus for a bottom margin */
    ${theme.$$breakpoints.gte('sm')} {
      margin-block: 5rem;
      margin-inline: auto;
      width: calc(100% - 6rem);
      max-width: 40rem;
      background-image: none;
      background-color: ${theme.color.popup};
      border-radius: ${theme.radius.xl};
    }
`,
);

export const navPanelInner = css`
  display: flex;
  flex-direction: column-reverse;
`;

export const closeContainer = css`
  position: sticky;
  top: 0.75rem;
  left: 100%;
  margin-right: 0.75rem;
  height: 0;
  width: fit-content;
`;

export const navClose = css`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${t('$color.gray.500')};
  outline: 0;

  /* Visible circle */
  width: 1.75rem;
  height: 1.75rem;
  border-radius: 100%;
  background-color: ${t('$color.gray.200')};

  /* Blur the dividers behind */
  backdrop-filter: blur(1rem);

  &:focus-visible {
    outline: 2px solid ${t('$color.blue')};
    outline-offset: -1px;
  }

  /* Tap target */
  &::after {
    content: '';
    width: 3rem;
    height: 3rem;
    position: absolute;
  }
`;

export const navSection = css`
  margin-bottom: 1rem;
`;

export const navHeading = css(({ theme }) => ({
  ...applyText(theme, 'lg'),
  fontWeight: 500,
  paddingInline: '$mobileNavItemPaddingX',

  '.headingInner': {
    display: 'flex',
    alignItems: 'center',
    height: '$mobileNavItemHeight',
  },

  '&::after': {
    content: '""',
    display: 'block',
    marginTop: '-1px',
    borderBottom: `1px solid ${theme.color.gray['200']}`,
  },
}));

export const navItem = css({
  '&::after': {
    content: '""',
    display: 'block',
    marginInline: '$mobileNavItemPaddingX',
    borderBottom: `1px solid ${t('$color.gray.200')}`,
  },
});

export const navLink = css`
  flex-grow: 1;
  display: flex;
  gap: 0.675rem;
  align-items: center;

  /* @TODO - Fix the css processor so that you can use local css variables through t() */
  height: var(--mobileNavItemHeight);
  padding-inline: var(--mobileNavItemPaddingX);

  &:focus-visible {
    outline: 2px solid ${t('$color.blue')};
    outline-offset: -1px;
  }

  @supports not (-webkit-tap-highlight-color: black) {
    &:active {
      background-color: ${t('$color.gray.100')};
    }
  }

  @supports (-webkit-tap-highlight-color: black) {
    ---var: 1;

    /* Applying background-color on :active shows it when touching items while scrolling */

    /* This activates only on real link taps */
    -webkit-tap-highlight-color: ${t('$color.gray.300')};
  }
`;
