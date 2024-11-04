import { styled } from '@pigment-css/react';
import { Metadata } from 'next';
import Link from 'next/link';

const Page = styled.div`
  display: grid;
  grid-template-rows: 20px 1fr 20px;
  place-items: center center;
  min-height: 100svh;
  padding: 80px;
  gap: 64px;
  font-family: var(--font-geist-sans);

  @media (prefers-color-scheme: dark) {
    & {
      --gray-rgb: 255, 255, 255;
      --gray-alpha-200: rgb(var(--gray-rgb) 0.145);
      --gray-alpha-100: rgb(var(--gray-rgb) 0.06);
      --button-primary-hover: #ccc;
      --button-secondary-hover: #1a1a1a;
    }
  }

  @media (max-width: 600px) {
    & {
      padding: 32px;
      padding-bottom: 80px;
    }
  }
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  gap: 32px;
  grid-row-start: 2;

  & ol {
    font-family: var(--font-geist-mono);
    padding-left: 0;
    margin: 0;
    font-size: 14px;
    line-height: 24px;
    letter-spacing: -0.01em;
    list-style-position: inside;
  }

  & li:not(:last-of-type) {
    margin-bottom: 8px;
  }

  & code {
    font-family: inherit;
    background: var(--gray-alpha-100);
    padding: 2px 4px;
    border-radius: 4px;
    font-weight: 600;
  }

  @media (max-width: 600px) {
    align-items: center;

    & ol {
      text-align: center;
    }
  }
`;

export default function Home() {
  return (
    <Page>
      <Main>
        <Link href="/getting-started/overview">Get Started</Link>
      </Main>
    </Page>
  );
}

export const metadata: Metadata = {
  title: {
    absolute: 'Pigment CSS',
    template: '%s | Pigment CSS',
  },
};
