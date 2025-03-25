import { applyText } from 'docs/utils/theme';
import { styled } from '@pigment-css/react-new';

export const GhostButton = styled.button(
  ({ theme }) => ({
    ...applyText(theme, 'xs'),
  }),
  `color: var(--color-gray);
  cursor: default;
  position: relative;
  z-index: 0;
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  outline: 0;
  user-select: none;

  &::before,
  &::after {
    content: '';
    position: absolute;
    z-index: -1;
  }

  &[data-layout='text'] {
    &::before {
      inset: -0.125rem -0.375rem;
      border-radius: var(--radius-sm);
    }
  }

  &[data-layout='icon'] {
    min-width: 1rem;
    min-height: 1rem;
    justify-content: center;

    &::before {
      inset: -0.25rem;
      border-radius: var(--radius-sm);
    }
  }

  /* Increase the clickable size  */
  &::after {
    inset: -0.375rem -0.5rem;
  }

  &:focus-visible::before {
    content: '';
    position: absolute;
    pointer-events: none;
    outline: 2px solid var(--color-blue);
    outline-offset: -1px;
  }

  &:not(:focus-visible) {
    @media (hover: hover) {
      &:hover {
        &::before {
          background-color: var(--color-gray-100);
        }
      }
    }

    &[data-popup-open] {
      &::before {
        background-color: var(--color-gray-100);
      }
    }

    /* No pressed state for menus */
    &:not([aria-haspopup]):active {
      &::before {
        background-color: var(--color-gray-200);
      }
    }
  }
`,
);
