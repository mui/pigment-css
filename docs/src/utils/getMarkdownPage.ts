import * as path from 'path';
import * as fs from 'node:fs/promises';
import { evaluate } from '@mdx-js/mdx';
import * as jsxRuntime from 'react/jsx-runtime';
import remarkFrontmatter from 'remark-frontmatter';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';
import remarkGfm from 'remark-gfm';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import extractToc, { type Toc } from '@stefanprobst/rehype-extract-toc';
import exportToc from '@stefanprobst/rehype-extract-toc/mdx';
import { read as readVFile } from 'to-vfile';
import { matter } from 'vfile-matter';

export interface PageMetadata {
  title: string;
  description: string;
  components?: string;
  githubLabel?: string;
  slug: string;
}

async function getFileHandle(basePath: string, slug: string) {
  const mdxFilePath = path.join(process.env.DATA_DIR as string, basePath, slug, `${slug}.mdx`);
  const mdFilePath = path.join(process.env.DATA_DIR as string, basePath, slug, `${slug}.md`);

  try {
    const fileHandle = await fs.open(mdxFilePath);
    return {
      isMd: false,
      handle: fileHandle,
      path: mdxFilePath,
      [Symbol.asyncDispose]: async () => {
        await fileHandle.close();
      },
    };
  } catch (ex1) {
    try {
      const fileHandle = await fs.open(mdFilePath);
      return {
        isMd: true,
        handle: fileHandle,
        path: mdFilePath,
        [Symbol.asyncDispose]: async () => {
          await fileHandle.close();
        },
      };
    } catch (ex2) {
      throw new Error('404');
    }
  }
}

export async function getMarkdownPage(basePath: string, slug: string) {
  await using file = await getFileHandle(basePath, slug);
  const mdxSource = await file.handle.readFile({
    encoding: 'utf-8',
  });
  const {
    default: MDXContent,
    frontmatter,
    tableOfContents,
  } = await evaluate(mdxSource, {
    ...jsxRuntime,
    remarkPlugins: [remarkGfm, remarkFrontmatter, remarkMdxFrontmatter],
    rehypePlugins: [
      [
        rehypePrettyCode,
        {
          theme: { light: 'vitesse-light', dark: 'vitesse-dark' },
          bypassInlineCode: true,
          grid: false,
        },
      ],
      rehypeSlug,
      extractToc,
      exportToc,
    ],
  });

  return {
    metadata: {
      ...(frontmatter as Partial<PageMetadata>),
      slug,
    } as PageMetadata,
    tableOfContents: tableOfContents as Toc,
    MDXContent,
    isMd: file.isMd,
  };
}

export async function getMarkdownPageMetadata(basePath: string, slug: string) {
  await using file = await getFileHandle(basePath, slug);

  const vfile = await readVFile(file.path);
  matter(vfile);
  return vfile.data.matter as PageMetadata;
}
