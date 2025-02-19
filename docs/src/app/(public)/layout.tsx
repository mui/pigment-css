import * as React from 'react';
import type { Metadata } from 'next/types';
import { Root, Container, Content } from './layout.pigment';

export default function Layout({ children }: React.PropsWithChildren) {
  return (
    <Root>
      <Container>
        <Content>{children}</Content>
      </Container>
    </Root>
  );
}

export const metadata: Metadata = {
  metadataBase: new URL('https://base-ui.com'),
};
