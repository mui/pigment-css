import * as React from 'react';

import * as Styled from './GhostButton.pigment';

interface GhostButtonProps extends React.ComponentProps<'button'> {
  layout?: 'text' | 'icon';
}

export function GhostButton({ className, layout = 'text', ...props }: GhostButtonProps) {
  return <Styled.GhostButton data-layout={layout} type="button" className={className} {...props} />;
}
