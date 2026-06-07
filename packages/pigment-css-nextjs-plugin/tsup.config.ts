import { Options, defineConfig } from 'tsup';
import config from '../../tsup.config';

const configOptions = config as Options;

export default defineConfig([
  {
    ...configOptions,
    tsconfig: './tsconfig.build.json',
    cjsInterop: true,
    entry: ['./src/index.ts', './src/virtual-css-loader.js'],
  },
  {
    ...configOptions,
    tsconfig: './tsconfig.build.json',
    cjsInterop: false,
    splitting: false,
    format: ['cjs'],
    entry: {
      'turbopack-loader': './src/turbopack-loader.ts',
    },
  },
]);
