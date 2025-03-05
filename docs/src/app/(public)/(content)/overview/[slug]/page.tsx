import ContentPage from 'docs/components/ContentPage';
import { getSlugs } from 'docs/nav';

const DIR_NAME = 'overview';

export default async function GettingStarted({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <ContentPage basePath={DIR_NAME} slug={slug} />;
}

export function generateStaticParams() {
  return getSlugs(`/${DIR_NAME}/`).map((slug) => ({ slug }));
}
