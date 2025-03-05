import { mdxComponents } from 'docs/mdx-components';
import { readMarkdown } from 'docs/utils/mdx';
import { notFound } from 'next/navigation';

export default async function ContentPage({ basePath, slug }: { basePath: string; slug: string }) {
  const MdxContent = await readMarkdown(basePath, slug);
  if (!MdxContent) {
    return notFound();
  }
  return <MdxContent components={mdxComponents} />;
}
