import * as React from 'react';
import { MainContent } from '@/components/MainContent';

export default function NotFoundPage() {
  return (
    <React.Fragment>
      <MainContent as="main">
        <h1>Not Found</h1>
        <p>The page that you were looking for could not be found.</p>
      </MainContent>
    </React.Fragment>
  );
}
