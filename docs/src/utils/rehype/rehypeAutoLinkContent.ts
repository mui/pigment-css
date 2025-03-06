import { visitParents } from 'unist-util-visit-parents';
import { Pluggable } from './rehypeSubtitle';

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
