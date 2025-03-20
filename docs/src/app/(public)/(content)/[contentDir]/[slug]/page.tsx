import * as fs from 'node:fs';
import * as path from 'node:path';
import ContentPage from 'docs/components/ContentPage';
import { filteredNav } from 'docs/nav';

export default async function GettingStarted({
  params,
}: {
  params: Promise<{ slug: string; contentDir: string }>;
}) {
  const { contentDir, slug } = await params;
  return <ContentPage basePath={contentDir} slug={slug} />;
}

export function generateStaticParams() {
  const items = filteredNav
    .flatMap((section) =>
      section.links.map((link) => ({
        slug: link.href.split('/').pop() as string,
        contentDir: section.dirname,
      })),
    )
    .filter(({ contentDir, slug }) =>
      fs.existsSync(path.join(process.env.CONTENT_DIR, contentDir, `${slug}.mdx`)),
    );
  return items;
}
