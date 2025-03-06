/* eslint-disable @typescript-eslint/no-explicit-any */
import { visitParents } from 'unist-util-visit-parents';

import { Pluggable } from './rehypeSubtitle';

const ALERT_TYPES = ['important', 'tip', 'note'];

export const rehypeGithubAlert: Pluggable = () => {
  return (tree) => {
    visitParents(tree, (node) => {
      if (node.tagName === 'blockquote' && node.children.length > 0) {
        const firstParagraph = node.children.find(
          (el: any) => el.type === 'element' && el.tagName === 'p',
        );
        if (!firstParagraph) {
          return;
        }
        const firstText = firstParagraph.children.find((t: any) => t.type === 'text');
        if (!firstText) {
          return;
        }
        const regex = new RegExp(`^\\[!(?<type>${ALERT_TYPES.join('|')})\\]`, 'gi');
        const match = regex.exec(firstText.value as string);
        if (match) {
          firstText.value = (firstText.value as string).replace(regex, '').trim();
        }
        node.type = 'mdxJsxFlowElement';
        node.name = 'Alert';
        node.attributes = [
          {
            type: 'mdxJsxAttribute',
            name: 'type',
            value: match?.groups?.type.toLowerCase(),
          },
        ];
      }
    });
  };
};
