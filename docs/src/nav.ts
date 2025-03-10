type NavItem = {
  label: string;
  dirname: string;
  links: { label: string; href: string; draft?: boolean }[];
  draft?: boolean;
};

export const nav: NavItem[] = [
  {
    label: 'Overview',
    dirname: 'overview',
    links: [
      {
        label: 'Quick start',
        href: '/overview/quick-start',
      },
      {
        label: 'Integrations',
        href: '/overview/integrations',
      },
      {
        label: 'Releases',
        href: '/overview/releases',
      },

      {
        label: 'About',
        href: '/overview/about',
      },
    ],
  },
  {
    label: 'Features',
    dirname: 'features',
    links: [
      {
        label: 'Styles',
        href: '/features/styles',
      },
      {
        label: 'Theming',
        href: '/features/theming',
      },
    ],
  },
  {
    label: 'Guides',
    dirname: 'guides',
    links: [
      {
        label: 'How it works',
        href: '/guides/how-it-works',
      },
      {
        label: 'Migration',
        href: '/guides/migration',
      },
      {
        label: 'UI Libraries',
        href: '/guides/ui-libraries',
      },
      {
        label: 'Light and Dark modes',
        href: '/guides/light-and-dark-modes',
      },
      {
        label: 'RTL support',
        href: '/guides/rtl-support',
        draft: true,
      },
    ],
  },
  {
    label: 'Packages',
    dirname: 'packages',
    links: [
      {
        label: 'Core',
        href: '/packages/core',
      },
      {
        label: 'React',
        href: '/packages/react',
      },
      {
        label: 'Theme',
        href: '/packages/theme',
      },
      {
        label: 'Utils',
        href: '/packages/utils',
      },
    ],
  },
];

const isProd = process.env.NODE_ENV === 'production';

export const filteredNav: NavItem[] = nav
  .filter((section) => !isProd || !section.draft)
  .map((section) => ({
    ...section,
    links: section.links.filter((link) => !isProd || !link.draft),
  }));

export function getSlugs() {
  return filteredNav.flatMap((section) =>
    section.links.map((link) => ({
      slug: link.href.split('/').pop() as string,
      contentDir: section.dirname,
    })),
  );
}
