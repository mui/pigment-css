import type { NextConfig } from 'next';
import { withPigment, extendTheme } from '@pigment-css/nextjs-plugin';
import path from 'path';
import { theme as baseTheme } from './src/theme';

const DATA_DIR = path.join(process.cwd(), 'data');

const nextConfig: NextConfig = {
  /* config options here */
  trailingSlash: false,
  env: {
    DATA_DIR,
  },
  distDir: 'export',
  output: process.env.NODE_ENV === 'production' ? 'export' : undefined,
  eslint: {
    ignoreDuringBuilds: true,
  },
};

const theme = extendTheme({
  colorSchemes: {
    light: baseTheme,
  },
});

export default withPigment(nextConfig, {
  theme,
  displayName: true,
  sourceMap: true,
  babelOptions: {
    plugins: ['@babel/plugin-proposal-explicit-resource-management'],
  },
});
