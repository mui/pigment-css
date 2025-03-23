const THEME = {
  color: {
    background: {
      default: '#f5f5f5',
      card: '#ffffff',
    },
    text: {
      primary: '#333333',
      secondary: '#666666',
    },
    border: {
      default: '#eaeaea',
    },
    shadow: {
      default: 'rgba(0, 0, 0, 0.1)',
      hover: 'rgba(0, 0, 0, 0.1)',
    },
  },
};

const THEME_DARK = {
  color: {
    background: {
      default: '#1a1a1a',
      card: '#2d2d2d',
    },
    text: {
      primary: '#ffffff',
      secondary: '#cccccc',
    },
    border: {
      default: '#404040',
    },
    shadow: {
      default: 'rgba(0, 0, 0, 0.3)',
      hover: 'rgba(255, 255, 255, 0.1)',
    },
  },
};

export type Theme = typeof THEME;

export { THEME, THEME_DARK };
