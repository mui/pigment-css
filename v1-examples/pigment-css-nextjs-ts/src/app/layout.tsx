import '@pigment-css/react-new/styles.css';
import './globals.css';

import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { styled } from '@pigment-css/react-new';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const Body = styled('body')(({ theme }) => ({
  backgroundColor: theme.color.background.default,
  color: theme.color.text.primary,
  transition: 'background-color 0.3s ease, color 0.3s ease',
}));

/**
 * For server-rendered apps, the theme can be set directly on the html element as data-theme="mode"
 *
 * @example
 *
 * ```js
 * const cookieStore = await cookies();
  const mode = cookieStore.get('mode');

  return (
    <html lang="en" data-theme={mode?.value ?? 'system'}>
    ```
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="system" suppressHydrationWarning>
      <head>
        <script
          id="theme-selector"
          // This script is run based on the assumption that this is a statically generated app.
          // For server-rendered apps, the theme can be set directly on the html element as data-theme="mode"
          // This is safe because the script is only run on the client
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: `const mode = window.localStorage.getItem('mode');
if (mode) {
  document.documentElement.dataset.theme = mode;
}`,
          }}
        />
      </head>
      <Body className={`${geistSans.variable} ${geistMono.variable}`}>{children}</Body>
    </html>
  );
}

export const metadata: Metadata = {
  title: 'Pigment CSS Next.js Example',
  description: 'An example of using Pigment CSS with Next.js and TypeScript',
  icons: {
    icon: [
      {
        url: '/favicon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  },
};

export const viewport: Viewport = {
  initialScale: 1,
  width: 'device-width',
};
