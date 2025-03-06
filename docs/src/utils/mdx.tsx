import * as path from 'node:path';
import * as fs from 'node:fs/promises';

import * as jsxRuntime from 'react/jsx-runtime';
import { createHighlighter } from 'shiki';
import { evaluate } from '@mdx-js/mdx';
import remarkGfm from 'remark-gfm';
import remarkTypography from 'remark-typography';
import rehypePrettyCode, { type Theme } from 'rehype-pretty-code';
import rehypeExtractToc from '@stefanprobst/rehype-extract-toc';
import rehypeSlug from 'rehype-slug';
import rehyeAutolinkHeading from 'rehype-autolink-headings';

import { rehypeSubtitle } from './rehype/rehypeSubtitle';
import { rehypeInlineCode } from './rehype/rehypeInlineCode';
import { rehypeQuickNav } from './rehype/rehypeQuickNav';

const theme: Theme = {
  name: 'pigment-css',
  bg: 'var(--color-content)',
  fg: 'var(--syntax-default)',
  settings: [
    {
      scope: ['comment', 'punctuation.definition.comment', 'string.comment'],
      settings: {
        foreground: 'var(--syntax-comment)',
      },
    },
    {
      scope: [
        'constant',
        'entity.name.constant',
        'variable.other.constant',
        'variable.other.enummember',
        'variable.language',
      ],
      settings: {
        foreground: 'var(--syntax-constant)',
      },
    },
    {
      scope: ['entity', 'entity.name'],
      settings: {
        foreground: 'var(--syntax-entity)',
      },
    },
    {
      scope: 'variable.parameter.function',
      settings: {
        foreground: 'var(--syntax-parameter)',
      },
    },
    {
      scope: 'entity.name.tag',
      settings: {
        foreground: 'var(--syntax-tag)',
      },
    },
    {
      scope: 'keyword',
      settings: {
        foreground: 'var(--syntax-keyword)',
      },
    },
    {
      scope: ['storage', 'storage.type'],
      settings: {
        foreground: 'var(--syntax-keyword)',
      },
    },
    {
      scope: ['storage.modifier.package', 'storage.modifier.import', 'storage.type.java'],
      settings: {
        foreground: 'var(--syntax-parameter)',
      },
    },
    {
      scope: [
        'string',
        'punctuation.definition.string',
        'string punctuation.section.embedded source',
      ],
      settings: {
        foreground: 'var(--syntax-string)',
      },
    },
    {
      scope: 'support',
      settings: {
        foreground: 'var(--syntax-constant)',
      },
    },
    {
      scope: 'meta.property-name',
      settings: {
        foreground: 'var(--syntax-constant)',
      },
    },
    {
      scope: 'variable',
      settings: {
        foreground: 'var(--syntax-variable)',
      },
    },
    {
      scope: 'variable.other',
      settings: {
        foreground: 'var(--syntax-parameter)',
      },
    },
    {
      scope: 'invalid.broken',
      settings: {
        fontStyle: 'italic',
        foreground: 'var(--syntax-invalid)',
      },
    },
    {
      scope: 'invalid.deprecated',
      settings: {
        fontStyle: 'italic',
        foreground: 'var(--syntax-invalid)',
      },
    },
    {
      scope: 'invalid.illegal',
      settings: {
        fontStyle: 'italic',
        foreground: 'var(--syntax-invalid)',
      },
    },
    {
      scope: 'invalid.unimplemented',
      settings: {
        fontStyle: 'italic',
        foreground: 'var(--syntax-invalid)',
      },
    },
    {
      scope: 'carriage-return',
      settings: {
        fontStyle: 'italic underline',
        background: 'var(--syntax-carriage-return-background)',
        foreground: 'var(--syntax-carriage-return-foreground)',
      },
    },
    {
      scope: 'message.error',
      settings: {
        foreground: 'var(--syntax-invalid)',
      },
    },
    {
      scope: 'string variable',
      settings: {
        foreground: 'var(--syntax-constant)',
      },
    },
    {
      scope: ['source.regexp', 'string.regexp'],
      settings: {
        foreground: 'var(--syntax-string)',
      },
    },
    {
      scope: [
        'string.regexp.character-class',
        'string.regexp constant.character.escape',
        'string.regexp source.ruby.embedded',
        'string.regexp string.regexp.arbitrary-repitition',
      ],
      settings: {
        foreground: 'var(--syntax-string)',
      },
    },
    {
      scope: 'string.regexp constant.character.escape',
      settings: {
        fontStyle: 'bold',
        foreground: 'var(--syntax-tag)',
      },
    },
    {
      scope: 'support.constant',
      settings: {
        foreground: 'var(--syntax-entity)',
      },
    },
    {
      scope: 'support.variable',
      settings: {
        foreground: 'var(--syntax-constant)',
      },
    },
    {
      scope: 'meta.module-reference',
      settings: {
        foreground: 'var(--syntax-constant)',
      },
    },
    {
      scope: 'punctuation.definition.list.begin.markdown',
      settings: {
        foreground: 'var(--syntax-variable)',
      },
    },
    {
      scope: ['markup.heading', 'markup.heading entity.name'],
      settings: {
        fontStyle: 'bold',
        foreground: 'var(--syntax-constant)',
      },
    },
    {
      scope: 'markup.quote',
      settings: {
        foreground: 'var(--syntax-tag)',
      },
    },
    {
      scope: 'markup.italic',
      settings: {
        fontStyle: 'italic',
        foreground: 'var(--syntax-other)',
      },
    },
    {
      scope: 'markup.bold',
      settings: {
        fontStyle: 'bold',
        foreground: 'var(--syntax-other)',
      },
    },
    {
      scope: ['markup.underline'],
      settings: {
        fontStyle: 'underline',
      },
    },
    {
      scope: ['markup.strikethrough'],
      settings: {
        fontStyle: 'strikethrough',
      },
    },
    {
      scope: 'markup.inline.raw',
      settings: {
        foreground: 'var(--syntax-constant)',
      },
    },
    {
      scope: ['markup.deleted', 'meta.diff.header.from-file', 'punctuation.definition.deleted'],
      settings: {
        background: 'var(--syntax-deleted-background)',
        foreground: 'var(--syntax-deleted-foreground)',
      },
    },
    {
      scope: ['markup.inserted', 'meta.diff.header.to-file', 'punctuation.definition.inserted'],
      settings: {
        background: 'var(--syntax-inserted-background)',
        foreground: 'var(--syntax-inserted-foreground)',
      },
    },
    {
      scope: ['markup.changed', 'punctuation.definition.changed'],
      settings: {
        background: 'var(--syntax-changed-background)',
        foreground: 'var(--syntax-changed-foreground)',
      },
    },
    {
      scope: ['markup.ignored', 'markup.untracked'],
      settings: {
        background: 'var(--syntax-untracked-background)',
        foreground: 'var(--syntax-untracked-foreground)',
      },
    },
    {
      scope: 'meta.diff.range',
      settings: {
        fontStyle: 'bold',
        foreground: 'var(--syntax-entity)',
      },
    },
    {
      scope: 'meta.diff.header',
      settings: {
        foreground: 'var(--syntax-constant)',
      },
    },
    {
      scope: 'meta.separator',
      settings: {
        fontStyle: 'bold',
        foreground: 'var(--syntax-constant)',
      },
    },
    {
      scope: 'meta.output',
      settings: {
        foreground: 'var(--syntax-constant)',
      },
    },
    {
      scope: [
        'brackethighlighter.tag',
        'brackethighlighter.curly',
        'brackethighlighter.round',
        'brackethighlighter.square',
        'brackethighlighter.angle',
        'brackethighlighter.quote',
      ],
      settings: {
        foreground: 'var(--syntax-bracket-highlight)',
      },
    },
    {
      scope: 'brackethighlighter.unmatched',
      settings: {
        foreground: 'var(--syntax-invalid)',
      },
    },
    {
      scope: ['constant.other.reference.link', 'string.other.link'],
      settings: {
        fontStyle: 'underline',
        foreground: 'var(--syntax-string)',
      },
    },
  ],
};

// @ts-expect-error Set highlighter on globalThis
globalThis.highlighter ??= createHighlighter({
  themes: [theme],
  langs: ['tsx', 'jsx', 'css'],
});

export async function renderMdx(mdxSource: string) {
  const prettyCodeOptions = {
    // @ts-expect-error Set highlighter on globalThis
    getHighlighter: async () => await globalThis.highlighter,
    grid: false,
    theme: 'pigment-css',
    defaultLang: 'tsx',
  };
  const { default: MDXContent } = await evaluate(mdxSource, {
    ...jsxRuntime,
    remarkPlugins: [remarkGfm, remarkTypography],
    rehypePlugins: [
      [rehypePrettyCode, prettyCodeOptions],
      rehypeSlug,
      [
        rehyeAutolinkHeading,
        {
          properties: {
            'data-autolink': '',
            tabindex: -1,
            'aria-hidden': 'true',
          },
        },
      ],
      rehypeExtractToc,
      rehypeQuickNav,
      rehypeSubtitle,
      rehypeInlineCode,
    ],
  });
  return MDXContent;
}

export async function readMarkdown(baseDir: string, filePath: string) {
  const mdxFilePath = path.join(process.env.CONTENT_DIR as string, baseDir, `${filePath}.mdx`);
  let file: fs.FileHandle | null = null;
  let mdxSource: string;

  try {
    file = await fs.open(mdxFilePath);
    mdxSource = await file.readFile({
      encoding: 'utf-8',
    });
  } catch (ex) {
    return null;
  } finally {
    await file?.close();
  }

  return renderMdx(mdxSource);
}
