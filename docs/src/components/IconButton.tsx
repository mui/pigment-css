import * as React from 'react';
import clsx from 'clsx';
import { css } from '@pigment-css/react';
import { Tooltip } from './Tooltip';

export const classes = {
  root: css`
    all: unset;
    line-height: 1;
    vertical-align: middle;
    background-clip: padding-box;
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent;
    flex-shrink: 0;
    user-select: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--br-circle);
    color: var(--gray-text-1);
    position: relative;

    @media screen and (hover: hover) {
      &:hover {
        background-color: var(--gray-container-2);
      }
    }

    &:focus-visible {
      outline: black solid 2px;
      outline-offset: 2px;
    }
  `,
  's-1': css`
    width: var(--space-6);
    height: var(--space-6);
  `,
  's-2': css`
    width: var(--space-7);
    height: var(--space-7);
  `,
  's-3': css`
    width: var(--space-8);
    height: var(--space-8);
  `,
};

export function IconButton(props: IconButton.Props) {
  const { size = 1, label, withTooltip, ...other } = props;
  const button = (
    <button
      type="button"
      aria-label={label}
      {...other}
      className={clsx(classes.root, classes[`s-${size}`], props.className)}
    />
  );

  if (withTooltip) {
    return <Tooltip label={label}>{button}</Tooltip>;
  }

  return button;
}

export namespace IconButton {
  export interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    size?: 1 | 2 | 3;
    label: string;
    withTooltip?: boolean;
  }
}
