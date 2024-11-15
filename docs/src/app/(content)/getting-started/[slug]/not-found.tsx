import * as React from 'react';
import { MainContent, MainContentContainer } from '@/components/MainContent';
import { Description } from '@/components/mdx/Description';

export default function NotFoundPage() {
  return (
    <MainContentContainer as="main">
      <MainContent sx={{ textAlign: 'center' }}>
        <h1>Page not found</h1>
        <Description>
          Apologies, but the page you were looking for wasn&apos;t found. Try reaching for the
          search button on the nav bar above to look for another one.
        </Description>
      </MainContent>
    </MainContentContainer>
  );
}
