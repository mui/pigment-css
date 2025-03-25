import * as React from 'react';
import type { Metadata, Viewport } from 'next/types';
import { styled, t } from '@pigment-css/react-new';

import { Header } from 'docs/components/Header';
import * as SideNav from 'docs/components/SideNav';
import { filteredNav } from 'docs/nav';
import * as QuickNav from 'docs/components/QuickNav';

const Root = styled.div(({ theme }) => ({
  $sidebarWidth: '17.5rem',
  display: 'grid',
  alignItems: 'start',
  paddingTop: t('$header.height'),
  paddingInline: '1.5rem',
  gridTemplateColumns: '1fr',
  [theme.breakpoints.gt('sm')]: {
    paddingInline: '2.5rem',
  },
  [theme.breakpoints.gt('lg')]: {
    paddingTop: 0,
    paddingInline: 0,
    gridTemplateColumns: '$sidebarWidth 1fr 3rem',
  },
  [theme.breakpoints.gt('quickNav')]: {
    gridTemplateColumns: '$sidebarWidth 1fr $sidebarWidth',
  },
}));

const Main = styled.div(({ theme }) => ({
  minWidth: 0,
  maxWidth: '48rem',
  width: '100%',
  paddingTop: '1.5rem',
  paddingBottom: '5rem',
  margin: '0 auto',
  [theme.breakpoints.gt('sm')]: {
    paddingTop: '2rem',
  },
  [theme.breakpoints.gt('lg')]: {
    margin: 0,
  },
  [theme.breakpoints.gt('quickNav')]: {
    margin: 0,
  },
}));

export default function Layout({ children }: React.PropsWithChildren) {
  return (
    <Root>
      <Header />
      <SideNav.Root>
        {filteredNav.map((section) => (
          <SideNav.Section key={section.label}>
            <SideNav.Heading>{section.label}</SideNav.Heading>
            <SideNav.List>
              {section.links.map((link) => (
                <SideNav.Item key={link.href} href={link.href}>
                  {link.label}
                </SideNav.Item>
              ))}
            </SideNav.List>
          </SideNav.Section>
        ))}
      </SideNav.Root>
      <Main>
        <QuickNav.Container>{children}</QuickNav.Container>
      </Main>
    </Root>
  );
}

// Title and description are pulled from <h1> and <Subtitle> in the MDX.
export const metadata: Metadata = {
  title: null,
  description: null,
};

export const viewport: Viewport = {
  themeColor: [
    // Desktop Safari header background
    {
      media: '(prefers-color-scheme: light) and (min-width: 1024px)',
      color: 'oklch(95% 0.25% 264)',
    },
    {
      media: '(prefers-color-scheme: dark) and (min-width: 1024px)',
      color: 'oklch(25% 1% 264)',
    },

    // Mobile Safari header background (match the site header)
    {
      media: '(prefers-color-scheme: light)',
      color: 'oklch(98% 0.25% 264)',
    },
    {
      media: '(prefers-color-scheme: dark)',
      color: 'oklch(17% 1% 264)',
    },
  ],
};
