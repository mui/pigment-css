import * as path from 'node:path';
import type { NextConfig } from 'next';
import withPigment, { type PigmentCSSConfig } from '@pigment-css/plugin/nextjs';
// @ts-expect-error This file doesn't have TS definitions.
import withDocsInfra from '@mui/monorepo/docs/nextConfigDocsInfra.js';

import theme, { THEME_DARK } from './src/theme';

import rootPackage from '../package.json';

const isProd = process.env.NODE_ENV === 'production';
const CONTENT_DIR = path.join(__dirname, 'src', 'content');

const nextConfig: NextConfig = {
  pageExtensions: ['tsx', 'pigment.tsx'],
  trailingSlash: false,
  env: {
    LIB_VERSION: rootPackage.version,
    CONTENT_DIR,
    CHANGELOG_FILE: path.join(__dirname, '../CHANGELOG.md'),
  },
  ...(isProd && { distDir: 'export', output: 'export' }),
  experimental: {
    esmExternals: true,
    workerThreads: false,
    useLightningcss: true,
  },
};

const pigmentConfig: PigmentCSSConfig = {
  theme: {
    colorSchemes: {
      light: theme,
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
  transformSx: false,
  displayName: !isProd,
  sourceMap: !isProd,
  include: /\.pigment\.tsx?$/,
};

export default withPigment(withDocsInfra(nextConfig), pigmentConfig);
