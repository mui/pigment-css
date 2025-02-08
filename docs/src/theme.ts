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
    background: 'var(--color-gray-50)',
    foreground: 'var(--color-gray-900)',
    popup: 'white',
    gridline: 'oklch(91.6% 1% 264)',
    selection: 'oklch(80% 50% 264 / 25%)',
    highlight: 'var(--color-blue)',
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
  },
  text: {
    base: {
      default: '1rem',
      lineHeight: '1.5rem',
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
    md: {
      default: '0.9375rem',
      lineHeight: '1.375rem',
      letterSpacing: '0em',
    },
  },
  header: {
    height: '3rem',
  },
  breakpoint: {
    maxLayoutWidth: '89rem',
    showQuickNav: '84rem',
    showSideNav: '64rem',
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
  $$breakpoints: BREAKPOINT_UTILS,
  $$utils: {
    apply(key: string, value: unknown) {
      const ctx = this as unknown as Theme;
      // @ts-expect-error Not typing explicitly to avoid circular typing
      const val = ctx[key][value] as Theme['text']['md'];
      return {
        fontSize: val.default,
        lineHeight: val.lineHeight,
        letterSpacing: val.letterSpacing,
      };
    },
    spacing(number: string | number) {
      const ctx = this as unknown as Theme;
      return `calc(${ctx.spacing} * ${number})`;
    },
  },
};

export type Theme = typeof THEME;
export default THEME;
