import '@pigment-css/react-new/styles.css';
import './globals.css';

import * as React from 'react';
import { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';

import { css, t } from '@pigment-css/react-new';

import favicon from '~assets/favicon.ico';
import faviconDev from '~assets/favicon-dev.ico';
import faviconSvg from '~assets/favicon.svg';
import faviconSvgDev from '~assets/favicon-dev.svg';
import faviconApple from '~assets/apple-touch-icon.png';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

const htmlCls = css`
  word-break: break-word;
  overflow-y: scroll;
`;

const bodyCls = css`
  font-family: system-ui;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: ${t('$color.background')};
  color: ${t('$color.foreground')};
  min-width: 320px;
  line-height: 1.5;
  font-synthesis: none;
`;

export default async function Layout({ children }: React.PropsWithChildren) {
  return (
    // suppressHydrationWarning is needed because we immediately modify the html on client
    // to update the theme before React hydration happens.
    <html lang="en" className={`${htmlCls}`} data-theme="system" suppressHydrationWarning>
      <head>
        <script
          id="theme-selector"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: `const mode = window.localStorage.getItem('mode');
if (mode) {
  document.documentElement.dataset.theme = mode;
}`,
          }}
        />
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: process.env.APP_NAME,
              url: process.env.WEBSITE,
            }),
          }}
        />
      </head>
      <body className={`${inter.variable} ${bodyCls}`}>{children}</body>
    </html>
  );
}

export const metadata: Metadata = {
  title: {
    template: `%s · ${process.env.APP_NAME}`,
    default: process.env.APP_NAME as string,
  },
  twitter: {
    site: '@PigmentCSS',
    card: 'summary_large_image',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: {
      template: `%s · ${process.env.APP_NAME}`,
      default: process.env.APP_NAME as string,
    },
    ttl: 604800,
  },
  applicationName: process.env.APP_NAME,
  icons: {
    icon: [
      {
        url: process.env.DEPLOY_ENV === 'production' ? favicon.src : faviconDev.src,
        sizes: '32x32',
        type: 'image/x-icon',
      },
      {
        url: process.env.DEPLOY_ENV === 'production' ? faviconSvg.src : faviconSvgDev.src,
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
    shortcut: {
      url: faviconApple.src,
      sizes: '180x180',
      type: 'image/png',
    },
    apple: {
      url: faviconApple.src,
      sizes: '180x180',
      type: 'image/png',
    },
  },
};

export const viewport: Viewport = {
  initialScale: 1,
  width: 'device-width',
};
