'use client';
import * as React from 'react';
import * as BaseTooltip from '@base_ui/react/Tooltip';
import { styled } from '@pigment-css/react';

const Popup = styled(BaseTooltip.Positioner)`
  background: var(--gray-900);
  color: white;
  padding: 8px;
  border-radius: 6px;
  font-size: var(--fs-1);
  cursor: default;
  font-family: var(--ff-sans);
  line-height: 1;
`;

const Arrow = styled(BaseTooltip.Arrow)`
  width: 10px;
  height: 10px;
  transform: rotate(45deg);
  background: var(--gray-900);

  &[data-side='top'] {
    bottom: -11px;
  }

  &[data-side='bottom'] {
    top: -11px;
  }

  &[data-side='left'] {
    right: -11px;
  }

  &[data-side='right'] {
    left: -11px;
  }
`;

export function Tooltip(props: Tooltip.Props) {
  const { label, children, side = 'top' } = props;

  return (
    <BaseTooltip.Root>
      <BaseTooltip.Trigger
        render={(triggerProps: React.ButtonHTMLAttributes<HTMLButtonElement>) =>
          React.cloneElement(children, triggerProps)
        }
      />
      <Popup side={side} sideOffset={8}>
        <BaseTooltip.Popup>
          {label}
          <Arrow />
        </BaseTooltip.Popup>
      </Popup>
    </BaseTooltip.Root>
  );
}

export namespace Tooltip {
  export interface Props {
    label: string;
    children: React.ReactElement<unknown>;
    side?: 'top' | 'right' | 'bottom' | 'left';
  }
}
