import { Options, defineConfig } from 'tsup';
import config from '../../tsup.config';
import zeroPkgJson from '../pigment-css-react/package.json';

const baseConfig: Options = {
  ...(config as Options),
  env: {
    ...(config as Options).env,
    RUNTIME_PACKAGE_NAME: zeroPkgJson.name,
  },
};

const frameworks = ['webpack', 'vite', 'nextjs'];

export default defineConfig({
  ...baseConfig,
  entry: frameworks.map((fw) => `./src/${fw}.ts`).concat('./src/nextjs-css-loader.js'),
});
