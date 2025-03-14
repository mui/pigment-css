import * as React from 'react';

import { InfoIcon, LightbulbIcon, TriangleAlertIcon, NotebookTextIcon } from 'lucide-react';

import { AlertRoot, AlertTitle } from './Alert.pigment';

type AlertProps = {
  type: 'important' | 'info' | 'tip' | 'note';
  children?: React.ReactNode;
};

const IconMap: Partial<Record<AlertProps['type'], typeof InfoIcon>> = {
  important: TriangleAlertIcon,
  info: InfoIcon,
  tip: LightbulbIcon,
  note: NotebookTextIcon,
};

export function Alert({ type = 'info', children }: AlertProps) {
  const Icon = IconMap[type];
  return (
    <AlertRoot variant={type}>
      <AlertTitle>
        {!!Icon && <Icon width={16} height={16} />}
        <strong>{type}</strong>
      </AlertTitle>
      {children}
    </AlertRoot>
  );
}
