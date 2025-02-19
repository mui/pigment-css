import { Options, defineConfig } from 'tsup';
import config from '../../tsup.config';

const processors = ['styled', 'css'];

const baseConfig: Options = {
  ...(config as Options),
  tsconfig: './tsconfig.build.json',
};

const BASE_FILES = ['index.ts'];

export default defineConfig([
  {
    ...baseConfig,
    entry: BASE_FILES.map((file) => `./src/${file}`),
  },
  {
    ...baseConfig,
    entry: ['./src/runtime/index.ts'],
    outDir: 'build/runtime',
  },
  {
    ...baseConfig,
    entry: processors.map((file) => `./src/processors/${file}.ts`),
    outDir: 'build/processors',
    cjsInterop: true,
  },
]);
