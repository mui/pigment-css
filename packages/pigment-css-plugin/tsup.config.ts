import { Options, defineConfig } from 'tsup';
import config from '../../tsup.config';
import zeroPkgJson from '../pigment-css-react/package.json';

const baseConfig: Options = {
  ...(config as Options),
  env: {
    ...(config as Options).env,
    RUNTIME_PACKAGE_NAME: zeroPkgJson.name,
  },
  cjsInterop: false,
};

const frameworks = ['webpack', 'vite', 'nextjs', 'nextjs-css-loader.js'];

const configs: Options[] = frameworks.map((fw) => ({
  ...baseConfig,
  outDir: `./${fw.split('.')[0]}`,
  entry: {
    index: `./src/${fw.includes('.') ? fw : `${fw}.ts`}`,
  },
  cjsInterop: false,
}));

export default defineConfig(configs);
