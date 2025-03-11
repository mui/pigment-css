import * as fs from 'node:fs/promises';
import { useMDXComponents } from 'docs/mdx-components';
import { renderMdx } from 'docs/utils/mdx';

const HEADER_MDX = `# Releases

<Subtitle>Changelogs for each Pigment&nbsp;CSS release.</Subtitle>
<Meta name="description" content="Changelogs for each Pigment&nbsp;CSS release." />

`;

export async function Changelog() {
  let content = await fs.readFile(process.env.CHANGELOG_FILE, {
    encoding: 'utf-8',
  });
  content = content
    // Remove the first line as it doesn't make sense on the page
    .replace('# [Versions](https://mui.com/versions/)', '')
    .trim()
    // Manually remove markdown comments and other fragments that MDX
    // doesn't support.
    .replaceAll(/<!-(.*?)->/gm, '')
    .replaceAll('<--', '');
  const components = useMDXComponents();
  const MdxContent = await renderMdx(`${HEADER_MDX}${content}`);
  return <MdxContent components={components} />;
}
