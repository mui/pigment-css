import * as React from 'react';

import { AlertRoot, AlertTitle } from './Alert.pigment';
import { InfoIcon } from 'docs/icons/InfoIcon';
import { LightBulbIcon } from 'docs/icons/LightBulbIcon';

type AlertProps = {
  type: 'important' | 'info' | 'tip' | 'note';
  children?: React.ReactNode;
};

const Icon: Partial<Record<AlertProps['type'], React.ReactNode>> = {
  important: <InfoIcon />,
  tip: <LightBulbIcon />,
};

export function Alert({ type = 'info', children }: AlertProps) {
  const icon = Icon[type];
  return (
    <AlertRoot variant={type}>
      <AlertTitle>
        {icon}
        <strong>{type}</strong>
      </AlertTitle>
      {children}
    </AlertRoot>
  );
}
