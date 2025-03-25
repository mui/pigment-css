import type { NextConfig } from 'next';
import withPigment, { PigmentCSSConfig } from '@pigment-css/plugin/nextjs';

import { THEME, THEME_DARK } from './src/theme';

const nextConfig: NextConfig = {
  /* config options here */
};

const pigmentConfig: PigmentCSSConfig = {
  theme: {
    colorSchemes: {
      light: THEME,
      dark: THEME_DARK,
    },
    defaultScheme: 'light',
    getSelector(mode) {
      if (mode === 'light') {
        return ':root, [data-theme="light"]';
      }

      return `[data-theme="${mode}"]`;
    },
  },
  include: /\.tsx?$/,
};

export default withPigment(nextConfig, pigmentConfig);
