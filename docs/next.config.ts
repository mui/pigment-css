import * as path from 'node:path';
import type { NextConfig } from 'next';
import withPigment, { type PigmentCSSConfig } from '@pigment-css/plugin/nextjs';
// @ts-expect-error This file doesn't have TS definitions.
import withDocsInfra from '@mui/monorepo/docs/nextConfigDocsInfra.js';

import theme from './src/theme';

import rootPackage from '../package.json';

const isProd = process.env.NODE_ENV === 'production';
const CONTENT_DIR = path.join(__dirname, 'src', 'content');

const nextConfig: NextConfig = {
  trailingSlash: false,
  env: {
    LIB_VERSION: rootPackage.version,
    APP_NAME: 'Pigment CSS',
    GITHUB: 'https://github.com/mui/pigment-css',
    NPM: 'https://www.npmjs.com/package/@pigment-css/core',
    WEBSITE: 'https://pigment-css.com',
    CONTENT_DIR,
  },
  ...(isProd && { distDir: 'export', output: 'export' }),
  experimental: {
    esmExternals: true,
    workerThreads: false,
    useLightningcss: true,
  },
};

const pigmentConfig: PigmentCSSConfig = {
  theme,
  transformSx: false,
  displayName: !isProd,
  sourceMap: !isProd,
  include: /\.pigment\.tsx?$/,
};

export default withPigment(withDocsInfra(nextConfig), pigmentConfig);
