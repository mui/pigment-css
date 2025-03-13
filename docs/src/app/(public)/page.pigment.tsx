import { Metadata, Viewport } from 'next';
import Image from 'next/image';
import { css, styled, t } from '@pigment-css/react-new';

import { applyText, spacing } from 'docs/utils/theme';
import { Link } from 'docs/components/Link';
import { ArrowRightIcon } from 'docs/icons/ArrowRightIcon';
import { nav } from 'docs/nav';

export const Root = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  paddingTop: '3rem',
  paddingBottom: 'calc(3rem + 5vh)',
  paddingInline: '2rem',
  alignItems: 'center',
  justifyContent: 'center',
});

export const Content = styled('div')({
  width: '100%',
  maxWidth: '25rem',
  textWrap: 'balance',
});

export const Heading = styled('h1')(({ theme }) => ({
  ...applyText(theme, 'xl'),
  fontWeight: 500,
  marginBottom: '0.5rem',
}));

export const Caption = styled.p`
  color: ${t('$color.gray.600')};
  margin-bottom: 2rem;
`;

export const linkStyle = css(
  ({ theme }) => `
  display: inline-flex;
  align-items: center;
  padding: ${spacing(theme, 1)};
  gap: ${spacing(theme, 1)};
  margin: ${spacing(theme, -1)};
`,
);

const logoStyle = css(({ theme }) => ({
  marginBottom: spacing(theme, 8),
  marginLeft: 1,
}));

const description = 'A Zero runtime CSS-in-JS styling engine.';

export default function HomePage() {
  return (
    <Root>
      <Content>
        <Image
          className={`${logoStyle}`}
          src="/static/logo.svg"
          width={18}
          height={30}
          alt={`${process.env.APP_NAME} logo`}
        />
        <Heading>{process.env.APP_NAME}</Heading>
        <Caption>{description}</Caption>
        <Link className={`${linkStyle}`} href={nav[0].links[0].href}>
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
