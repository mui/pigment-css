import { toString } from 'hast-util-to-string';
import { visitParents } from 'unist-util-visit-parents';

import { Pluggable } from './rehypeSubtitle';

/**
 * - Adds a `data-inline` attribute to distinguish inline code from code blocks
 * - Tweaks how inline code syntax highlighting works
 */
export const rehypeInlineCode: Pluggable = () => {
  return (tree) => {
    visitParents(tree, (node, ancestors) => {
      if (node.tagName !== 'code' || ancestors.find(({ tagName }) => tagName === 'pre')) {
        return;
      }

      node.properties ??= {};
      node.properties['data-inline'] = '';

      // Unwrap the <span> that contains the <code> element
      const span = ancestors.slice(-1)[0];
      const spanParent = ancestors.slice(-2)[0];
      const spanIndex = spanParent.children.indexOf(span);
      spanParent.children[spanIndex] = node;
      // Unwrap the <span> that is contained within the <code> element
      node.children = node.children[0].children;

      // We don't want a background-color and color on the inline <code> tags
      delete node.properties.style;

      // Tweak how `undefined`, `null`, and `""` are highlighted

      node.children?.forEach((part: any) => {
        const text = part.children[0]?.value;
        if (text === 'undefined' || text === 'null' || text === '""' || text === "''") {
          part.properties.style = 'color: var(--syntax-nullish, inherit)';
        }
      });

      // Tweak `<tag>` highlights to paint the bracket with the tag highlight color
      if (toString(node).match(/^<.+>$/)) {
        const keyNode = node.children?.find(
          (part: any) => part.properties.style !== 'color:var(--syntax-default)',
        );

        node.children?.forEach((part: any) => {
          part.properties.style = keyNode.properties.style;
        });
      }
    });
  };
};
