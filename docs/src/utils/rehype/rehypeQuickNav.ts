import { TocEntry } from '@stefanprobst/rehype-extract-toc';
import { Pluggable } from './rehypeSubtitle';
import { createMdxElement } from './createMdxElement';

const ROOT = 'QuickNav.Root';
const TITLE = 'QuickNav.Title';
const LIST = 'QuickNav.List';
const ITEM = 'QuickNav.Item';
const LINK = 'QuickNav.Link';

export const rehypeQuickNav: Pluggable = () => {
  return (tree, file) => {
    const toc = file.data.toc;
    if (!toc) {
      return;
    }
    const root = createMdxElement({
      name: ROOT,
      children: toc.flatMap(getNodeFromEntry).filter(Boolean),
    });

    if (!toc.length) {
      return;
    }

    tree.children.unshift(root);
  };
};

function getNodeFromEntry({ value, depth, id, children }: TocEntry) {
  const sub = createMdxElement({
    name: LIST,
    children: [],
  });

  // Ignore <h4>'s and below
  if (depth < 3 && children?.length) {
    sub.children = children.map(getNodeFromEntry);
  }

  if (depth === 1) {
    // Insert "(Top)" link
    sub.children?.unshift(getNodeFromEntry({ value: '(Top)', id: '', depth: 2 }));

    return [
      // Insert a top-level title
      createMdxElement({
        name: TITLE,
        children: [{ type: 'text', value }],
      }),
      sub,
    ];
  }

  const link = createMdxElement({
    name: LINK,
    children: [{ type: 'text', value }],
    props: {
      href: `#${id}`,
    },
  });

  return createMdxElement({
    name: ITEM,
    children: [link, sub],
  });
}
