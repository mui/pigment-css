import { Metadata, Viewport } from 'next';
import Image from 'next/image';

import { Link } from 'docs/src/components/Link';
import { ArrowRightIcon } from 'docs/src/icons/ArrowRightIcon';
import { Root, Content, Heading, linkStyle, Caption } from './page.pigment';

const description = 'A build-time CSS-in-JS styling engine';

export default function HomePage() {
  return (
    <Root>
      <Content>
        <Image src="/static/logo.svg" width={30} height={30} alt={`${process.env.APP_NAME} logo`} />
        <Heading>{process.env.APP_NAME}</Heading>
        <Caption>{description}</Caption>
        <Link className={`${linkStyle}`} href="/overview/quick-start">
          Documentation <ArrowRightIcon />
        </Link>
      </Content>
    </Root>
  );
}

export const metadata: Metadata = {
  description,
  twitter: {
    description,
  },
  openGraph: {
    description,
  },
};

export const viewport: Viewport = {
  themeColor: [
    // Desktop Safari page background
    {
      media: '(prefers-color-scheme: light) and (min-width: 1024px)',
      color: 'oklch(95% 0.25% 264)',
    },
    {
      media: '(prefers-color-scheme: dark) and (min-width: 1024px)',
      color: 'oklch(25% 1% 264)',
    },

    // Mobile Safari header background (match the page)
    {
      media: '(prefers-color-scheme: light)',
      color: '#FFF',
    },
    {
      media: '(prefers-color-scheme: dark)',
      color: '#000',
    },
  ],
};
