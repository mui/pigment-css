import ContentPage from 'docs/components/ContentPage';
import { getSlugs } from 'docs/nav';

export default async function GettingStarted({
  params,
}: {
  params: Promise<{ slug: string; contentDir: string }>;
}) {
  const { contentDir, slug } = await params;
  return <ContentPage basePath={contentDir} slug={slug} />;
}

export function generateStaticParams() {
  return getSlugs();
}
