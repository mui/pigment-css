const BREAKPOINTS = {
  xs: '32rem',
  sm: '40rem',
  md: '48rem',
  lg: '64rem',
  xl: '80rem',
  '2xl': '96rem',
  quickNav: '84rem',
} as const;

const BREAKPOINT_UTILS = {
  gt(key: keyof typeof BREAKPOINTS) {
    return `@media (min-width: ${BREAKPOINTS[key]})`;
  },
  lt(key: keyof typeof BREAKPOINTS) {
    return `@media (max-width: ${BREAKPOINTS[key]})`;
  },
  between(from: keyof typeof BREAKPOINTS, to: keyof typeof BREAKPOINTS) {
    return `@media (min-width: ${BREAKPOINTS[from]}) and (max-width: ${BREAKPOINTS[to]})`;
  },
  gte(key: keyof typeof BREAKPOINTS) {
    return `@media (width >= ${BREAKPOINTS[key]})`;
  },
};

const BASE_SPACING = '0.25rem' as const;

const THEME = {
  spacing: BASE_SPACING,
  color: {
    white: 'white',
    black: 'black',
    gray: {
      0: 'var(--color-gray-600)',
      50: 'oklch(98% 0.25% 264)',
      75: 'oklch(97% 0.325% 264)',
      100: 'oklch(12% 9.5% 264 / 5%)',
      200: 'oklch(12% 9% 264 / 7%)',
      300: 'oklch(12% 8.5% 264 / 17%)',
      400: 'oklch(12% 8% 264 / 38%)',
      500: 'oklch(12% 7.5% 264 / 50%)',
      600: 'oklch(12% 7% 264 / 67%)',
      700: 'oklch(12% 6% 264 / 77%)',
      800: 'oklch(12% 5% 264 / 85%)',
      900: 'oklch(12% 5% 264 / 90%)',
      950: 'oklch(12% 5% 264 / 95%)',
    },
    content: 'white',
    background: '$color.gray.50',
    foreground: '$color.gray.900',
    popup: 'white',
    gridline: 'oklch(91.6% 1% 264)',
    selection: 'oklch(80% 50% 264 / 25%)',
    highlight: '$color.blue',
    line: {
      highlight: 'oklch(80% 50% 264 / 10%)',
      highlightStrong: 'oklch(80% 50% 264 / 25%)',
    },
    inlineHighlight: 'oklch(80% 50% 264 / 15%)',
    navy: 'oklch(31% 25% 264)',
    blue: 'oklch(45% 50% 264)',
    green: 'oklch(46% 30% 150)',
    purple: 'oklch(40% 45% 360)',
    violet: 'oklch(40% 60% 300)',
    red: 'oklch(50% 55% 31)',
    yellow: 'oklch(0.67 0.16 93.62)',
  },
  text: {
    base: {
      default: '1rem',
      lineHeight: '1.5rem',
      letterSpacing: '0em',
    },
    xs: {
      default: '0.8125rem',
      lineHeight: '1.25rem',
      letterSpacing: '0.001em',
    },
    sm: {
      default: '0.875rem',
      lineHeight: '1.25rem',
      letterSpacing: '0em',
    },
    md: {
      default: '0.9375rem',
      lineHeight: '1.375rem',
      letterSpacing: '0em',
    },
    lg: {
      default: '1.125rem',
      lineHeight: '1.75rem',
      letterSpacing: '-0.0025em',
    },
    xl: {
      default: '1.3125rem',
      lineHeight: '1.625rem',
      letterSpacing: '-0.005em',
    },
    '3xl': {
      default: '1.875rem',
      lineHeight: '1.2re,',
      letterSpacing: '-0.015em',
    },
  },
  header: {
    height: '3rem',
  },
  breakpoint: {
    maxLayoutWidth: '89rem',
    showQuickNav: BREAKPOINTS.quickNav,
    showSideNav: BREAKPOINTS.lg,
  },
  ease: {
    out: {
      fast: 'cubic-bezier(0.45, 1.005, 0, 1.005)',
    },
    in: {
      slow: 'cubic-bezier(0.375, 0.015, 0.545, 0.455)',
    },
  },
  radius: {
    xs: '.125rem',
    sm: '.25rem',
    md: '.375rem',
    lg: '.5rem',
    xl: '.75rem',
    '2xl': '1rem',
    '3xl': '1.5rem',
    '4xl': '2rem',
  },
  font: {
    weight: {
      bold: 700,
      medium: 500,
    },
  },
  syntax: {
    default: '$color.foreground',
    comment: '$color.gray',
    constant: '$color.blue',
    entity: '$color.violet',
    parameter: '$color.navy',
    tag: '$color.green',
    keyword: '$color.red',
    string: '$color.green',
    variable: '$color.red',
    invalid: '$color.red',
  },
  breakpoints: BREAKPOINT_UTILS,
};

export type Theme = typeof THEME;

export const THEME_DARK = {
  color: {
    white: 'white',
    black: 'black',
    gray: {
      50: 'oklch(17% 0.25% 264)',
      75: 'oklch(19% 0.5% 264)',
      100: 'oklch(28% 0.75% 264 / 65%)',
      200: 'oklch(29% 0.75% 264 / 80%)',
      300: 'oklch(35% 0.75% 264 / 80%)',
      400: 'oklch(47% 0.875% 264 / 80%)',
      500: 'oklch(64% 1% 264 / 80%)',
      600: 'oklch(82% 1% 264 / 80%)',
      700: 'oklch(92% 1.125% 264 / 80%)',
      800: 'oklch(93% 0.875% 264 / 85%)',
      900: 'oklch(95% 0.5% 264 / 90%)',
      950: 'oklch(94% 0.375% 264 / 95%)',
      default: '$color.gray.600',
    },
    content: 'black',
    background: '$color.content',
    foreground: 'oklch(90% 2% 264)',
    popup: '$color.gray.50',
    gridline: 'oklch(24% 1% 264)',
    selection: 'oklch(50% 50% 264 / 40%)',
    highlight: 'oklch(45% 40% 264)',
    line: {
      highlight: 'oklch(50% 50% 264 / 20%)',
      highlightStrong: 'oklch(50% 50% 264 / 35%)',
    },
    inlineHighlight: 'oklch(50% 50% 264 / 35%)',
    navy: 'oklch(85% 25% 264)',
    blue: 'oklch(69% 50% 264)',
    green: 'oklch(75% 25% 150)',
    purple: 'oklch(85% 30% 360)',
    violet: 'oklch(80% 60% 280)',
    red: 'oklch(80% 55% 31)',
    yellow: 'oklch(0.88 0.15 83.95)',
  },
};

export default THEME;
