import * as fs from 'node:fs/promises';
import { mdxComponents } from 'docs/mdx-components';
import { renderMdx } from 'docs/utils/mdx';

export async function Changelog() {
  const file = await fs.open(process.env.CHANGELOG_FILE);
  let content = await file.readFile({
    encoding: 'utf-8',
  });
  await file.close();
  content = content.replaceAll(/<!-(.*?)->/gm, '').replaceAll('<--', '');
  const MdxContent = await renderMdx(content);
  return <MdxContent components={mdxComponents} />;
}
