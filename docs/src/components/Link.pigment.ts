import { css, t } from '@pigment-css/react-new';

export const linkStyle = css`
  color: ${t('$color.blue')};
  text-decoration: underline;
  text-underline-offset: 2px;
  text-decoration-thickness: 1px;
  text-decoration-color: color-mix(in oklab, ${t('$color.blue')}, transparent);

  &:focus-visible {
    outline: 2px solid ${t('$color.blue')};
    outline-offset: -2px;
    border-radius: var(--radius-sm);
  }

  &[data-autolink] {
    display: inline;
  }

  @media (hover: hover) {
    &:hover {
      text-decoration-color: ${t('$color.blue')};
    }
  }
`;

export const externalLinkStyle = css`
  margin-right: 0.125em;
  display: inline-flex;
  align-items: center;
  gap: 0.25em;
`;
