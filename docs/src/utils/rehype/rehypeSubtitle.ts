import { visitParents } from 'unist-util-visit-parents';
import type { evaluate } from '@mdx-js/mdx';

export type Pluggable = Exclude<
  Parameters<typeof evaluate>[1]['rehypePlugins'],
  undefined | null
>[number];

/**
 * Unwrap potential paragraphs inside `<Subtitle>`
 */
export const rehypeSubtitle: Pluggable = () => {
  return (tree) => {
    visitParents(tree, (node, ancestors) => {
      const parent = ancestors.slice(-1)[0];

      if (parent?.name !== 'Subtitle' || node.tagName !== 'p') {
        return;
      }

      console.log(node);

      const index = parent.children.indexOf(node);
      parent.children.splice(index, 1, ...node.children);
    });
  };
};
