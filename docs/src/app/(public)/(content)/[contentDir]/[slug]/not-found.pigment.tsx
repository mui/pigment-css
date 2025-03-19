import { Metadata } from 'next';
import { Link } from 'docs/components/Link';
import { Content, Heading, Caption } from 'docs/app/(public)/page.pigment';

export default function Notfound() {
  return (
    <Content>
      <Heading>Not found</Heading>
      <Caption>
        This page couldn&apos;t be found. Please return to the docs or create a corresponding issue
        on <Link href={process.env.GITHUB}>GitHub</Link>.
      </Caption>
    </Content>
  );
}

export const metadata: Metadata = {
  title: 'Page not found',
};
