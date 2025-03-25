import * as React from 'react';
import { ScrollArea } from '@base-ui-components/react/scroll-area';

import * as Styled from './ScrollArea.pigment';

export const Root = ScrollArea.Root;

export const Viewport = Styled.Viewport;

export function Scrollbar({ className, ...props }: ScrollArea.Scrollbar.Props) {
  return (
    <Styled.Scrollbar className={className} {...props}>
      <Styled.Thumb className="ScrollAreaThumb" />
    </Styled.Scrollbar>
  );
}

export function Corner({ className, ...props }: ScrollArea.Corner.Props) {
  return <ScrollArea.Corner className={className} {...props} />;
}
