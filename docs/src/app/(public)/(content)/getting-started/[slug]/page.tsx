import ContentPage from 'docs/components/ContentPage';

export default async function GettingStarted({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <ContentPage basePath="getting-started" slug={slug} />;
}
