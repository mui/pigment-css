import * as path from 'node:path';
import type { Plugin, UserConfig } from 'vite';
import {
  preprocessor as basePreprocessor,
  generateTokenCss,
  type Theme,
  extendTheme,
  generateThemeSource,
} from '@pigment-css/react/utils';
import { transformAsync } from '@babel/core';
import baseWywPluginPlugin, { type VitePluginOptions } from './vite-plugin';

export interface PigmentOptions extends Omit<VitePluginOptions, 'themeArgs'> {
  /**
   * The theme object that you want to be passed to the `styled` function
   */
  theme?: Theme;
}

type PigmentMeta = {
  'pigment-css'?: {
    vite?: {
      include: string[];
    };
  };
};

const VIRTUAL_CSS_FILE = `\0zero-runtime-styles.css`;
const VIRTUAL_THEME_FILE = `\0zero-runtime-theme.js`;

const extensions = ['.js', '.jsx', '.mjs', '.cjs', '.ts', '.tsx', '.mts', '.cts'];

function hasCorectExtension(fileName: string) {
  return extensions.some((ext) => fileName.endsWith(ext));
}

function isZeroRuntimeProcessableFile(fileName: string, transformLibraries: string[]) {
  const isNodeModule = fileName.includes('node_modules');
  const isTransformableFile =
    isNodeModule && transformLibraries.some((libName) => fileName.includes(libName));
  return (
    hasCorectExtension(fileName) &&
    (isTransformableFile || !isNodeModule) &&
    !fileName.includes('runtime/dist')
  );
}

const MATERIAL_WRAPPER_LIB = '@mui/material-pigment-css';

export function pigment(options: PigmentOptions) {
  const {
    theme,
    babelOptions = {},
    preprocessor,
    transformLibraries = [],
    transformSx = true,
    css,
    ...other
  } = options ?? {};
  const defaultLibs = [process.env.RUNTIME_PACKAGE_NAME as string, MATERIAL_WRAPPER_LIB];
  const allLibs = transformLibraries.concat(defaultLibs);
  const finalTransformLibraries = allLibs.map((lib) => lib.split('/').join(path.sep));

  function injectMUITokensPlugin(): Plugin {
    return {
      name: 'pigment-css-theme-injection-plugin',
      enforce: 'pre',
      resolveId(source) {
        if (finalTransformLibraries.some((lib) => source.includes(`${lib.replace(/\\/g, '/')}/styles.css`))) {
          return VIRTUAL_CSS_FILE;
        }
        if (finalTransformLibraries.some((lib) => source.includes(`${lib.replace(/\\/g, '/')}/theme`))) {
          return VIRTUAL_THEME_FILE;
        }
        return null;
      },
      load(id) {
        if (id === VIRTUAL_CSS_FILE) {
          return generateTokenCss(theme);
        }
        if (id === VIRTUAL_THEME_FILE) {
          return generateThemeSource(theme);
        }
        return null;
      },
    };
  }

  function intermediateBabelPlugin(): Plugin {
    return {
      name: 'pigment-css-sx-plugin',
      enforce: 'post',
      async transform(code, id) {
        const [filename] = id.split('?');
        if (!isZeroRuntimeProcessableFile(id, finalTransformLibraries)) {
          return null;
        }
        try {
          const result = await transformAsync(code, {
            filename,
            babelrc: false,
            configFile: false,
            plugins: [[`${process.env.RUNTIME_PACKAGE_NAME}/exports/sx-plugin`]],
          });
          return {
            code: result?.code ?? code,
            map: result?.map,
          };
        } catch (ex) {
          console.error(ex);
          return null;
        }
      },
    };
  }

  function updateConfigPlugin(): Plugin {
    return {
      name: 'pigment-css-config-plugin',
      config() {
        const includes: Array<string> = [];
        allLibs.forEach((lib) => {
          try {
            // eslint-disable-next-line import/no-dynamic-require, global-require
            const pkg = require(`${lib}/package.json`) as PigmentMeta;
            const pkgIncludes = pkg['pigment-css']?.vite?.include ?? [];
            if (pkgIncludes.length > 0) {
              includes.push(...pkgIncludes);
            }
          } catch (ex) {
            if (lib !== MATERIAL_WRAPPER_LIB) {
              console.warn(
                `${process.env.PACKAGE_NAME}: You have specified "${lib}" in "transformLibraries" but it is not installed.`,
              );
            }
          }
        });
        const optimizeDeps: UserConfig['optimizeDeps'] = {
          exclude: allLibs,
        };
        if (includes.length) {
          optimizeDeps.include = includes;
        }
        return {
          optimizeDeps,
        };
      },
    };
  }

  const withRtl = (selector: string, cssText: string) => {
    return basePreprocessor(selector, cssText, css);
  };

  const zeroPlugin = baseWywPluginPlugin({
    themeArgs: {
      theme,
    },
    transformLibraries: finalTransformLibraries,
    packageMap: finalTransformLibraries.reduce(
      (acc, lib) => {
        acc[lib] = lib;
        return acc;
      },
      {} as Record<string, string>,
    ),
    preprocessor: preprocessor ?? withRtl,
    babelOptions: {
      ...babelOptions,
      plugins: ['@babel/plugin-syntax-typescript', ...(babelOptions.plugins ?? [])],
    },
    ...other,
  });

  return [
    updateConfigPlugin(),
    injectMUITokensPlugin(),
    transformSx ? intermediateBabelPlugin() : null,
    zeroPlugin,
  ];
}

export { extendTheme };
