import * as React from 'react';

export function ChevronRightIcon(props: React.SVGAttributes<SVGElement>) {
  return (
    <svg
      width="16"
      height="16"
      focusable="false"
      aria-hidden="true"
      viewBox="0 0 24 24"
      data-testid="ChevronRightIcon"
      {...props}
    >
      <path d="M10 6 8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
    </svg>
  );
}
