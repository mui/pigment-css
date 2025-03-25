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
        label: 'Styling',
        href: '/features/styling',
      },
      {
        label: 'Theming',
        href: '/features/theming',
      },
      {
        label: 'Variants',
        href: '/features/variants',
      },
      {
        label: 'Composition',
        href: '/features/composition',
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
        draft: true,
      },
      {
        label: 'UI Libraries',
        href: '/guides/ui-libraries',
        draft: true,
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
    label: 'Package',
    dirname: 'packages',
    links: [
      {
        label: 'plugin',
        href: '/packages/plugin',
      },
    ],
  },
];

const isProdDeploy = process.env.DEPLOY_ENV === 'production';

export const filteredNav: NavItem[] = nav
  .filter((section) => !isProdDeploy || !section.draft)
  .map((section) => ({
    ...section,
    links: section.links.filter((link) => !isProdDeploy || !link.draft),
  }));
