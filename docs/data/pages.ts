export interface RouteMetadata {
  pathname: string;
  title?: string;
  children?: readonly RouteMetadata[];
  planned?: boolean;
  unstable?: boolean;
}

const pages: readonly RouteMetadata[] = [
  {
    pathname: '/getting-started',
    title: 'Getting started',
    children: [{ pathname: '/getting-started/overview', title: 'Overview' }],
  },
];

export default pages;

function extractSlug(pathname: string) {
  return pathname.split('/').pop()!;
}

export function getSlugs(parentPath: string) {
  const slugs: string[] = [];

  const categoryPages = pages.find((page) => page.pathname === parentPath);
  categoryPages?.children?.forEach((level2Page) => {
    if (level2Page.children) {
      slugs.push(...level2Page.children.map((page) => extractSlug(page.pathname)));
    } else {
      slugs.push(extractSlug(level2Page.pathname));
    }
  });

  return slugs;
}
