export const theme = {
  gray: {
    surface: {
      1: 'hsl(0 0% 99%)',
      2: 'hsl(0 0% 97.5%)',
    },
    container: {
      1: 'hsl(0 0% 96.5%)',
      2: 'hsl(0 0% 95%)',
      3: 'hsl(0 0% 92%)',
    },
    outline: {
      1: 'hsl(0 0% 93%)',
      2: 'hsl(0 0% 88%)',
    },
    text: {
      1: 'hsl(0 0% 45.75%)',
      2: 'hsl(0 0% 15%)',
    },
  },
  grayA: {
    surface: {
      2: 'hsl(0 0% 97% / 86%)',
    },
  },
  code: {
    1: '#cc4e00',
    2: '#7d5e54',
    3: '#cb1d63',
    4: '#8145b5',
    5: '#9e6c00',
    6: '#00749e',
  },
  space: {
    1: '4px',
    2: '8px',
    3: '12px',
    4: '16px',
    5: '20px',
    6: '24px',
    7: '32px',
    8: '40px',
    9: '48px',
  },
  fs: {
    1: '12px',
    2: '13px',
    3: '14px',
    4: '16px',
    5: '18px',
    6: '20px',
    7: '26px',
    8: '36px',
    9: '58px',
  },
  fw: {
    1: '400',
    2: '500',
  },
  br: {
    circle: '50%',
    pill: '9999px',
  },
  ff: {
    sans: "graphik, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Sans', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji'",
    code: "Söhne mono, ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, 'Liberation Mono', monospace",
  },
};

export type Theme = typeof theme;
