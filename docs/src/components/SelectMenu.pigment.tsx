import { CheckIcon as LucideCheckIcon } from 'lucide-react';
import { Menu as BaseMenu } from '@base-ui-components/react/menu';
import { css, styled, t } from '@pigment-css/react-new';

import { spacing } from 'docs/utils/theme';

const Trigger = styled(BaseMenu.Trigger)`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.375rem;
  height: 2.5rem;
  padding: 0 0.5rem;
  margin: 0;
  outline: 0;
  border-radius: 0.375rem;
  font-family: inherit;
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.5rem;
  color: ${t('$color.gray.900')};
  user-select: none;

  @media (hover: hover) {
    &:hover {
      background-color: ${t('$color.gray.100')};
    }
  }

  &:active {
    background-color: ${t('$color.gray.100')};
  }

  &[data-popup-open] {
    background-color: ${t('$color.gray.100')};
  }

  &:focus-visible {
    outline: 2px solid ${t('$color.blue')};
    outline-offset: -1px;
  }
`;

const Positioner = styled(BaseMenu.Positioner)`
  outline: 0;
`;

const Popup = styled(BaseMenu.Popup)`
  box-sizing: border-box;
  padding-block: 0.25rem;
  border-radius: 0.375rem;
  background-color: canvas;
  color: ${t('$color.gray.900')};
  transform-origin: var(--transform-origin);
  transition:
    transform 150ms,
    opacity 150ms;

  &[data-starting-style],
  &[data-ending-style] {
    opacity: 0;
    transform: scale(0.9);
  }

  @media (prefers-color-scheme: light) {
    outline: 1px solid ${t('$color.gray.200')};
    box-shadow:
      0 10px 15px -3px ${t('$color.gray.200')},
      0 4px 6px -4px ${t('$color.gray.200')};
  }

  @media (prefers-color-scheme: dark) {
    outline: 1px solid ${t('$color.gray.300')};
    outline-offset: -1px;
  }
`;

const Arrow = styled(BaseMenu.Arrow)`
  display: flex;

  &[data-side='top'] {
    bottom: -8px;
    rotate: 180deg;
  }

  &[data-side='bottom'] {
    top: -8px;
    rotate: 0deg;
  }

  &[data-side='left'] {
    right: -13px;
    rotate: 90deg;
  }

  &[data-side='right'] {
    left: -13px;
    rotate: -90deg;
  }
`;

export const CheckIcon = styled(LucideCheckIcon)`
  stroke: ${t('$color.green')};
`;

export const RadioItem = styled(BaseMenu.RadioItem)`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  outline: 0;
  cursor: default;
  user-select: none;
  padding-block: 0.5rem;
  padding-inline: 1rem;
  font-size: 0.875rem;
  line-height: 1rem;

  &[data-highlighted] {
    z-index: 0;
    position: relative;
    color: ${t('$color.gray.50')};

    ${CheckIcon} {
      stroke: ${t('$color.background')};
    }
  }

  &[data-highlighted]::before {
    content: '';
    z-index: -1;
    position: absolute;
    inset-block: 0;
    inset-inline: 0.25rem;
    border-radius: 0.25rem;
    background-color: ${t('$color.gray.900')};
  }
`;

export const triggerIcon = css(({ theme }) => ({
  marginRight: spacing(theme, -0.25),
}));

export const arrowIconCls = {
  fill: css`
    fill: canvas;
  `,
  outerStroke: css`
    @media (prefers-color-scheme: light) {
      fill: var(--color-gray-200);
    }
  `,
  innerStroke: css`
    @media (prefers-color-scheme: dark) {
      fill: var(--color-gray-300);
    }
  `,
};

export const Menu = {
  ...BaseMenu,
  Trigger,
  Positioner,
  Popup,
  Arrow,
  RadioItem,
};
