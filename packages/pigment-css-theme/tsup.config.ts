import { Options, defineConfig } from 'tsup';
import config from '../../tsup.config';

const baseConfig: Options = {
  ...(config as Options),
  tsconfig: './tsconfig.build.json',
};

const BASE_FILES = ['index.ts', 'index-node.ts'];

export default defineConfig([
  {
    ...baseConfig,
    entry: BASE_FILES.map((file) => `./src/${file}`),
  },
]);
