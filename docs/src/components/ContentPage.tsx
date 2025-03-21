import { notFound } from 'next/navigation';

import { useMDXComponents } from 'docs/mdx-components';
import { readMarkdown } from 'docs/utils/mdx';
import { Link } from './Link';

export default async function ContentPage({ basePath, slug }: { basePath: string; slug: string }) {
  const components = useMDXComponents();
  const result = await readMarkdown(basePath, slug);
  if (!result) {
    return notFound();
  }
  const { MdxContent, githubFilePath } = result;
  return (
    <div>
      <MdxContent components={components} />
      <div style={{ display: 'flex', justifyContent: 'flex-end', fontSize: '0.8rem' }}>
        <Link href={githubFilePath} target="_blank" rel="noopener noreferrer">
          Edit on GitHub
        </Link>
      </div>
    </div>
  );
}
