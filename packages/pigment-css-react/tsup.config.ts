import { Options, defineConfig } from 'tsup';
import config from '../../tsup.config';

const processors = [
  'styled',
  'sx',
  'keyframes',
  'generateAtomics',
  'css',
  'createUseThemeProps',
  'createExtendSxProp',
  'globalCss',
  'useTheme',
];
const external = ['react', 'react-is', 'prop-types'];

const baseConfig: Options = {
  ...(config as Options),
  tsconfig: './tsconfig.build.json',
  external,
};

const BASE_FILES = [
  'index.ts',
  'internal/index.ts',
  'theme.ts',
  'Box.jsx',
  'RtlProvider.tsx',
  'Stack.jsx',
  'Container.jsx',
  'Hidden.jsx',
  'Grid.jsx',
];

export default defineConfig([
  {
    ...baseConfig,
    entry: BASE_FILES.map((file) => `./src/${file}`),
  },
  {
    ...baseConfig,
    entry: processors.map((file) => `./src/processors/${file}.ts`),
    outDir: 'processors',
  },
  {
    ...baseConfig,
    entry: [
      './src/utils/index.ts',
      './src/utils/sx-plugin.ts',
      './src/utils/remove-prop-types-plugin.ts',
    ],
    outDir: 'utils',
  },
  {
    ...baseConfig,
    entry: [
      './src/internal/index.ts',
    ],
    outDir: 'internal',
  },
]);
