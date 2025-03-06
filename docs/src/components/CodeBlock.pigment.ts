import { t } from '@pigment-css/theme';
import { css, styled } from '@pigment-css/react-new';
import { applyText } from 'docs/utils/theme';

export const Root = styled.figure({
  backgroundColor: '$color.content',
  border: `1px solid ${t('$color.gray.200')}`,
  borderRadius: t('$radius.md'),
});

export const Panel = styled.div(
  ({ theme }) => ({
    ...applyText(theme, 'xs'),
    backgroundColor: '$color.gray.50',
    color: '$color.gray.0',
    borderBottom: `1px solid ${t('$color.gray.200')}`,
  }),
  `
    line-height: 1;
    background-clip: padding-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    white-space: nowrap;
    padding: 0 0.75rem;
    height: 2.25rem;
    border-top-left-radius: inherit;
    border-top-right-radius: inherit;

    /* Scroll */
    overflow: auto hidden;
    overscroll-behavior-x: contain;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }

    /* Scroll containers may be focusable */
    &:focus-visible {
      position: relative;
      outline: 2px solid var(--color-blue);
      outline-offset: -1px;
      z-index: 1;
    }
`,
);

export const PanelTitle = styled.div(({ theme }) => ({
  ...applyText(theme, 'sm'),
  color: '$color.gray.700',
  fontWeight: 400,
}));

export const CopyLabel = styled.span(() => ({
  display: 'flex',
  fontSize: 14,
  alignItems: 'center',
  justifyContent: 'center',
}));

export const Pre = styled.pre(
  ({ theme }) => ({
    ...applyText(theme, 'xs'),
  }),
  `
  cursor: text;
  color: var(--color-foreground);
  background-color: var(--color-content);
  padding: 0.5rem 0;
  border-radius: var(--radius-md);
  outline: 0;

  /* Scroll */
  display: flex;
  overflow: auto;
  /* Prevent Chrome/Safari page navigation gestures when scrolling horizontally */
  overscroll-behavior-x: contain;

  & code {
    /* Different fonts may introduce vertical align issues */
    display: block;
    /* Make sure selection highlight spans full container width in Safari */
    flex-grow: 1;
  }
`,
);

export const preContainer = css`
  outline: 0;
`;

export const ghostButtonStyle = css`
  margin-left: auto;
`;
