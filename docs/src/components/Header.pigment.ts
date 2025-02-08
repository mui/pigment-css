import { t } from '@pigment-css/theme';
import { css, styled } from '@pigment-css/react-new';

import { applyText, spacing } from 'docs/src/utils/theme';

export const Root = styled.div(({ theme }) => ({
  ...applyText(theme, 'md'),
  position: 'absolute',
  left: 0,
  top: 0,
  width: '100%',
  height: '$header.height',
}));

export const Inner = styled.div(
  ({ theme }) => `
  height: inherit;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-inline: 1.5rem;

  position: fixed;
  top: 0;
  inset-inline: 0;
  box-shadow: inset 0 -1px ${theme.color.gridline};
  background-color: ${theme.color.gray['50']};
  z-index: 1;

  ${theme.$$breakpoints.gt('lg')} {
    position: static;
    box-shadow: none;
    background-color: transparent;
  }
`,
);

export const logoLink = css(
  ({ theme }) => `
  display: flex;
  padding: 0.25rem 0.5rem;
  margin: -0.25rem -0.5rem;

  &:active {
    color: ${theme.color.gray['500']};
  }

  & svg {
    margin-top: -0.125rem;
  }

  &:focus-visible {
    border-radius: ${theme.radius.md};
    outline: 2px solid ${theme.color.blue};
    outline-offset: -1px;
  }
`,
);

export const headerLink = css`
  display: flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.25rem 0.5rem;
  margin: -0.25rem -0.5rem;
  border-radius: ${t('$radius.md')};

  @media not (hover: hover) {
    &:active {
      color: ${t('$color.gray.500')};
    }
  }

  &:focus-visible {
    z-index: 1;
    outline: 2px solid ${t('$color.blue')};
    outline-offset: -1px;
  }

  & > * {
    flex-shrink: 0;
  }
`;

export const headerButton = css`
  @media (hover: hover) {
    &:hover {
      background-color: ${t('$color.gray.100')};
    }
  }
  @media not (hover: hover) {
    &:active {
      background-color: ${t('$color.gray.100')};
    }
  }
`;

export const HeaderLinkContainer = styled.div(
  ({ theme }) => `
  display: flex;
  gap: ${spacing(theme, 6)};
  ${theme.$$breakpoints.lt('lg')} {
    display: none;
  }
`,
);

export const MobileNavContainer = styled.div(
  ({ theme }) => `
  display: flex;
  ${theme.$$breakpoints.gte('lg')} {
    display: none;
  }
`,
);

export const NpmPackage = styled.span`
  display: flex;
  flex-grow: 1;
  align-items: baseline;
  justify-content: space-between;
`;

export const NpmPackageVersionText = styled.span(({ theme }) => ({
  ...applyText(theme, 'md'),
  color: theme.color.gray['600'],
}));

export const NavIcon = styled.div(
  ({ theme }) => `
  display: flex;
  width: ${spacing(theme, 4)};
  flex-direction: column;
  align-items: center;
  gap: ${spacing(theme, 1)};

  .navIconBar {
    height: ${spacing(theme, 0.5)};
    width: ${spacing(theme, 3.5)};
    background-color: currentColor;
  }
`,
);
