import { visitParents } from 'unist-util-visit-parents';
import type { evaluate } from '@mdx-js/mdx';

export type Pluggable = Exclude<
  Parameters<typeof evaluate>[1]['rehypePlugins'],
  undefined | null
>[number];

/**
 * Unwrap potential paragraphs inside `<Subtitle>`
 */
export const rehypeAutoLinkContent: Pluggable = () => {
  return (tree) => {
    visitParents(tree, (node) => {
      if (
        node.tagName === 'a' &&
        node.type === 'element' &&
        node.properties &&
        'data-autolink' in node.properties
      ) {
        node.children = [
          {
            type: 'mdxJsxFlowElement',
            name: 'LinkIcon',
            data: { _mdxExplicitJsx: true },
            children: [],
          },
        ];
      }
    });
  };
};
