import type { NextConfig } from 'next';
import { withPigment, extendTheme } from '@pigment-css/nextjs-plugin';
import { theme as baseTheme } from './src/theme';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');

const nextConfig: NextConfig = {
  /* config options here */
  trailingSlash: false,
  env: {
    DATA_DIR,
  },
  distDir: 'export',
  output: process.env.NODE_ENV === 'production' ? 'export' : undefined,
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
