import { Metadata } from 'next';
import { Root, Content, Heading, linkStyle, Caption } from './(public)/page.pigment';
import { Link } from 'docs/src/components/Link';
import Layout from './(public)/layout';

export default function Notfound() {
  return (
    <Layout>
      <Root>
        <Content>
          <Heading>Not found</Heading>
          <Caption>
            This page couldn&apos;t be found. Please return to the docs or create a corresponding
            issue on GitHub..
          </Caption>
          <Link className={`${linkStyle}`} href="/">
            Back to home
          </Link>
        </Content>
      </Root>
    </Layout>
  );
}

export const metadata: Metadata = {
  title: 'Page not found',
};
