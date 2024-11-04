import * as React from 'react';
import { styled } from '@pigment-css/react';

export interface ComponentLinkHeaderProps {
  githubLabel?: string;
  ariaSpecUrl?: string;
}

const Root = styled.div`
  display: flex;
  gap: var(--space-5);
  margin-bottom: var(--space-9);

  & > a {
    font-family: var(--ff-sans);
    font-size: var(--fs-3);
  }
`;

export function ComponentLinkHeader(props: ComponentLinkHeaderProps) {
  const { githubLabel, ariaSpecUrl } = props;

  return (
    <Root>
      {githubLabel && (
        <a
          href={`${process.env.SOURCE_CODE_REPO}/labels/${encodeURIComponent(githubLabel)}`}
          rel="nofollow"
          data-ga-event-category="ComponentLinkHeader"
          data-ga-event-action="click"
          data-ga-event-label="githubLabel"
          data-ga-event-split="0.1"
        >
          Give Feedback
        </a>
      )}
      {ariaSpecUrl && (
        <a
          href={ariaSpecUrl}
          rel="nofollow"
          data-ga-event-category="ComponentLinkHeader"
          data-ga-event-action="click"
          data-ga-event-label="WAI_ARIA"
          data-ga-event-split="0.1"
        >
          WAI-ARIA
        </a>
      )}
      <a
        href="https://bundlephobia.com/package/@base_ui/react@latest"
        rel="nofollow"
        data-ga-event-category="ComponentLinkHeader"
        data-ga-event-action="click"
        data-ga-event-label="bundleSize"
        data-ga-event-split="0.1"
      >
        Bundle Size
      </a>
    </Root>
  );
}
