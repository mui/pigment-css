import * as React from 'react';
import Head from 'next/head';
import { Geist, Geist_Mono } from 'next/font/google';
import { styled } from '@pigment-css/react-new';

import { ThemeSelector } from '@/components/ThemeSelector';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const Container = styled.div({
  minHeight: '100vh',
  padding: '2rem',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

const Main = styled.main(({ theme }) => ({
  maxWidth: 800,
  width: '100%',
  backgroundColor: theme.color.background.card,
  borderRadius: 10,
  padding: '2rem',
  boxShadow: `0 2px 10px ${theme.color.shadow.default}`,
}));

const Card = styled.div(({ theme }) => ({
  padding: '1.5rem',
  border: `1px solid ${theme.color.border.default}`,
  borderRadius: 8,
  transition: 'transform 0.2s ease',
  backgroundColor: theme.color.background.card,
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: `0 4px 15px ${theme.color.shadow.hover}`,
  },
  h3: {
    fontSize: '1.4rem',
    marginBottom: '1rem',
    color: theme.color.text.primary,
  },
  p: {
    color: theme.color.text.secondary,
    lineHeight: 1.5,
  },
  a: {
    color: '#08c',
    textDecoration: 'underline',
  },
}));

const Title = styled.h1(({ theme }) => ({
  fontSize: '2.5rem',
  marginBottom: '1.5rem',
  color: theme.color.text.primary,
  textAlign: 'center',
}));

const Description = styled.p(({ theme }) => ({
  fontSize: '1.2rem',
  lineHeight: 1.6,
  color: theme.color.text.secondary,
  marginBottom: '2rem',
}));

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
`;

export default function Home() {
  return (
    <React.Fragment>
      <Head>
        <title>Pigment CSS Next.js Pages Router Example</title>
        <meta
          name="description"
          content="An example of using Pigment CSS with Next.js pages router and TypeScript"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.svg" sizes="any" type="image/svg+xml" />
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
      </Head>
      <Container className={`${geistSans.variable} ${geistMono.variable}`}>
        <Main>
          <ThemeSelector />
          <Title>Welcome to Next.js!</Title>

          <Description>
            This is a simple example of a Next.js application styled using Pigment&nbsp;CSS.
          </Description>

          <Grid>
            <Card>
              <h3>Next.js</h3>
              <p>
                Next.js is a React framework for building server-side rendered (SSR), static site
                generation (SSG), and hybrid web applications.
              </p>
            </Card>

            <Card>
              <h3>Pigment CSS</h3>
              <p>
                <a href="https://pigment-css.com">Pigment CSS</a> is a zero-runtime CSS framework
                that allows you to colocate your styles with your components and extracts all the
                styles into separate CSS file at build time.
              </p>
            </Card>

            <Card>
              <h3>Theming</h3>
              <p>
                Change the theme by selecting a different theme from the dropdown above. The theme
                will be persisted in browser&apos;s local storage.
              </p>
            </Card>
          </Grid>
        </Main>
      </Container>
    </React.Fragment>
  );
}
