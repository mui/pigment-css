import type { NextConfig } from 'next';
import nextMdx from '@next/mdx';
import withPigment, { type PigmentCSSConfig } from '@pigment-css/plugin/nextjs';
import remarkGfm from 'remark-gfm';
import remarkTypography from 'remark-typography';
import rehypeExtractToc from '@stefanprobst/rehype-extract-toc';
// @ts-expect-error This file doesn't have TS definitions.
import withDocsInfra from '@mui/monorepo/docs/nextConfigDocsInfra.js';

import theme from './src/theme';
import rootPackage from '../package.json';

const withMdx = nextMdx({
  options: {
    remarkPlugins: [remarkGfm, remarkTypography],
    rehypePlugins: [rehypeExtractToc],
  },
});

const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  trailingSlash: false,
  pageExtensions: ['mdx', 'tsx'],
  env: {
    LIB_VERSION: rootPackage.version,
    APP_NAME: 'Pigment CSS',
    GITHUB: 'https://github.com/mui/pigment-css',
    NPM: 'https://www.npmjs.com/package/@pigment-css/core',
  },
  ...(isProd && { distDir: 'export', output: 'export' }),
  experimental: {
    esmExternals: true,
    workerThreads: false,
  },
};

const pigmentConfig: PigmentCSSConfig = {
  theme,
  transformSx: false,
  displayName: !isProd,
  sourceMap: !isProd,
  include: /\.pigment\.tsx?$/,
};

export default withPigment(withMdx(withDocsInfra(nextConfig)), pigmentConfig);
