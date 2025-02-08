import * as React from 'react';
import { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

import '@pigment-css/react-new/styles.css';
import './globals.css';
import { bodyCls, htmlCls } from './layout.pigment';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export default function Layout({ children }: React.PropsWithChildren) {
  return (
    <html lang="en" className={`${htmlCls}`}>
      <body className={`${geistSans.variable} ${geistMono.variable} ${bodyCls}`}>{children}</body>
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
        url:
          process.env.NODE_ENV === 'production' ? '/static/favicon.ico' : '/static/favicon-dev.ico',
        sizes: '32x32',
      },
      {
        url:
          process.env.NODE_ENV === 'production' ? '/static/favicon.svg' : '/static/favicon-dev.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
    shortcut: {
      url: '/static/apple-touch-icon.png',
      sizes: '180x180',
    },
    apple: {
      url: '/static/apple-touch-icon.png',
      sizes: '180x180',
    },
  },
};

export const viewport: Viewport = {
  initialScale: 1,
  width: 'device-width',
};
