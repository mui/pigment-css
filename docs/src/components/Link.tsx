import * as React from 'react';
import clsx from 'clsx';
import NextLink from 'next/link';
import { ExternalLinkIcon } from 'docs/src/icons/ExternalLinkIcon';
import { externalLinkStyle, linkStyle } from './Link.pigment';

export function Link({ href, className, ...props }: React.ComponentProps<typeof NextLink>) {
  // Sometimes link come from component descriptions; in this case, remove the domain
  if (typeof href === 'string' && href.startsWith('https://base-ui.com')) {
    href = href.replace('https://base-ui.com', '');
  }

  if (typeof href === 'string' && href.startsWith('http')) {
    return (
      <NextLink
        href={href}
        target="_blank"
        rel="noopener"
        {...props}
        className={clsx(`${linkStyle}`, `${externalLinkStyle}`, className)}
      >
        {props.children}
        <ExternalLinkIcon />
      </NextLink>
    );
  }

  return <NextLink href={href} className={clsx(`${linkStyle}`, className)} {...props} />;
}
