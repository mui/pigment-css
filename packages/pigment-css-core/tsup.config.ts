import { Options, defineConfig } from 'tsup';
import config from '../../tsup.config';

const processors = ['css', 'keyframes'];

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
    outDir: 'runtime',
  },
  {
    ...baseConfig,
    entry: processors.map((file) => `./src/processors/${file}.ts`),
    outDir: 'processors',
    cjsInterop: true,
  },
]);
