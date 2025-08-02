import * as path from 'node:path';
import { transformAsync } from '@babel/core';
import {
  type Preprocessor,
  type PluginOptions as WywInJsPluginOptions,
  type IFileReporterOptions,
  TransformCacheCollection,
  transform,
  createFileReporter,
} from '@wyw-in-js/transform';
import { slugify } from '@wyw-in-js/shared';
import {
  UnpluginFactoryOutput,
  WebpackPluginInstance,
  createUnplugin,
  UnpluginOptions,
} from 'unplugin';
import {
  preprocessor as basePreprocessor,
  generateTokenCss,
  generateThemeSource,
  extendTheme,
  matchAdapterPath,
  type Theme as BaseTheme,
  type PluginCustomOptions,
} from '@pigment-css/react/utils';
import { styledEngineMockup } from '@pigment-css/react/internal';
import { handleUrlReplacement, type AsyncResolver } from './utils';

type NextMeta = {
  type: 'next';
  dev: boolean;
  isServer: boolean;
  outputCss: boolean;
  placeholderCssFile: string;
  projectPath: string;
};

type ViteMeta = {
  type: 'vite';
};

type WebpackMeta = {
  type: 'webpack';
};

type Meta = NextMeta | ViteMeta | WebpackMeta;

export type PigmentOptions<Theme extends BaseTheme = BaseTheme> = {
  theme?: Theme;
  transformLibraries?: string[];
  preprocessor?: Preprocessor;
  debug?: IFileReporterOptions | false;
  sourceMap?: boolean;
  meta?: Meta;
  asyncResolve?: (...args: Parameters<AsyncResolver>) => Promise<string | null>;
  transformSx?: boolean;
} & Partial<WywInJsPluginOptions> &
  Omit<PluginCustomOptions, 'themeArgs'>;

const extensions = ['.js', '.jsx', '.mjs', '.cjs', '.ts', '.tsx', '.mts', '.cts'];

function hasCorectExtension(fileName: string) {
  return extensions.some((ext) => fileName.endsWith(ext));
}

const VIRTUAL_CSS_FILE = `\0zero-runtime-styles.css`;
const VIRTUAL_THEME_FILE = `\0zero-runtime-theme.js`;

function isZeroRuntimeThemeFile(fileName: string) {
  return fileName === VIRTUAL_CSS_FILE || fileName === VIRTUAL_THEME_FILE;
}

function isZeroRuntimeProcessableFile(fileName: string, transformLibraries: string[]) {
  const isNodeModule = fileName.includes('node_modules');
  const isTransformableFile =
    isNodeModule && transformLibraries.some((libName) => fileName.includes(libName));
  return (
    hasCorectExtension(fileName) &&
    (isTransformableFile || !isNodeModule) &&
    !fileName.includes('runtime/build')
  );
}

const addMaterialUIOverriedContext = (originalContext: Record<string, unknown>) => {
  const originalRequire = originalContext.require as (id: string) => any;
  const newRequire = (id: string) => {
    if (id === '@mui/styled-engine' || id === '@mui/styled-engine-sc') {
      return styledEngineMockup;
    }
    return originalRequire(id);
  };
  originalContext.require = newRequire;
  return originalContext;
};

/**
 * Next.js initializes the plugin multiple times. So all the calls
 * have to share the same Maps.
 */
const globalCssFileLookup = new Map<string, string>();

const pluginName = 'PigmentCSSWebpackPlugin';

function innerNoop() {
  return null;
}

function outerNoop() {
  return innerNoop;
}

export const plugin = createUnplugin<PigmentOptions, true>((options) => {
  const {
    theme,
    meta,
    transformLibraries = [],
    preprocessor,
    asyncResolve: asyncResolveOpt,
    debug = false,
    sourceMap = false,
    transformSx = true,
    overrideContext,
    tagResolver,
    css,
    ...other
  } = options;
  const finalTransformLibraries = transformLibraries
    .concat([process.env.RUNTIME_PACKAGE_NAME as string, '@mui/material-pigment-css'])
    .map((lib) => lib.split('/').join(path.sep));
  const cache = new TransformCacheCollection();
  const { emitter, onDone } = createFileReporter(debug ?? false);
  const cssFileLookup = meta?.type === 'next' ? globalCssFileLookup : new Map<string, string>();
  const isNext = meta?.type === 'next';
  const outputCss = isNext && meta.outputCss;
  const babelTransformPlugin: UnpluginOptions = {
    name: 'pigment-css-plugin-transform-babel',
    enforce: 'post',
    transformInclude(id) {
      return isZeroRuntimeProcessableFile(id, finalTransformLibraries);
    },
    async transform(code, id) {
      const result = await transformAsync(code, {
        filename: id,
        babelrc: false,
        configFile: false,
        plugins: [[`${process.env.RUNTIME_PACKAGE_NAME}/exports/sx-plugin`]],
      });
      if (!result) {
        return null;
      }
      return {
        code: result.code ?? code,
        map: result.map,
      };
    },
  };
  const projectPath = meta?.type === 'next' ? meta.projectPath : process.cwd();

  const withRtl = (selector: string, cssText: string) => {
    return basePreprocessor(selector, cssText, css);
  };

  const wywInJSTransformPlugin: UnpluginOptions = {
    name: 'pigment-css-plugin-transform-wyw-in-js',
    enforce: 'post',
    buildEnd() {
      onDone(projectPath);
    },
    transformInclude(id) {
      return isZeroRuntimeProcessableFile(id, finalTransformLibraries);
    },
    async transform(code, url) {
      const [filePath] = url.split('?');
      // Converts path separator as per platform, even on Windows, path segments have `/` instead of the usual `\`,
      // so this function replaces such path separators.
      const id = path.normalize(filePath);
      // @ts-ignore
      const nativeContext = this.getNativeBuildContext();
      if (nativeContext?.framework !== 'webpack') {
        throw new Error('This plugin should only be used with Webpack/Next.js.');
      }
      const asyncResolve = async (
        token: string,
        importer: string,
        stack: string[],
      ): Promise<string> => {
        const njsResult = await asyncResolveOpt?.(token, importer, stack);
        if (typeof njsResult === 'string') {
          return njsResult;
        }
        const context = path.isAbsolute(importer)
          ? path.dirname(importer)
          : path.join(projectPath, path.dirname(importer));
        return new Promise((resolve, reject) => {
          nativeContext.loaderContext!.resolve(context, token, (err, result) => {
            if (err) {
              reject(err);
            } else if (result) {
              nativeContext.loaderContext!.addDependency(result);
              resolve(result);
            } else {
              reject(new Error(`${process.env.PACKAGE_NAME}: Cannot resolve ${token}`));
            }
          });
        });
      };
      const transformServices = {
        options: {
          filename: id,
          root: projectPath,
          preprocessor: preprocessor ?? withRtl,
          pluginOptions: {
            ...other,
            themeArgs: {
              theme,
            },
            packageMap: transformLibraries.reduce(
              (acc, lib) => {
                acc[lib] = lib;
                return acc;
              },
              {} as Record<string, string>,
            ),
            features: {
              useWeakRefInEval: false,
              // If users know what they are doing, let them override to true
              ...other.features,
            },
            overrideContext(context: Record<string, unknown>, filename: string) {
              if (!context.$RefreshSig$) {
                context.$RefreshSig$ = outerNoop;
              }
              addMaterialUIOverriedContext(context);
              if (overrideContext) {
                return overrideContext(context, filename);
              }
              return context;
            },
            tagResolver(source: string, tag: string) {
              const tagResult = tagResolver?.(source, tag);
              if (tagResult) {
                return tagResult;
              }
              if (matchAdapterPath(source)) {
                return require.resolve(`${process.env.RUNTIME_PACKAGE_NAME}/exports/${tag}`);
              }
              return null;
            },
            babelOptions: {
              ...other.babelOptions,
              plugins: [
                require.resolve(
                  `${process.env.RUNTIME_PACKAGE_NAME}/exports/remove-prop-types-plugin`,
                ),
                'babel-plugin-define-var', // A fix for undefined variables in the eval phase of wyw-in-js, more details on https://github.com/siriwatknp/babel-plugin-define-var?tab=readme-ov-file#problem
                ...(other.babelOptions?.plugins ?? []),
              ],
            },
          },
        },
        cache,
        eventEmitter: emitter,
      };

      try {
        const result = await transform(transformServices, code, asyncResolve);

        if (!result.cssText) {
          return null;
        }

        let { cssText } = result;

        const slug = slugify(cssText);

        if (isNext && !outputCss) {
          return {
            code: result.code,
            map: result.sourceMap,
          };
        }

        if (isNext) {
          // Handle url() replacement in css. Only handled in Next.js as the css is injected
          // through the use of a placeholder CSS file that lies in the nextjs plugin package.
          // So url paths can't be resolved relative to that file.
          if (cssText && cssText.includes('url(')) {
            cssText = await handleUrlReplacement(cssText, id, asyncResolve, projectPath);
          }

          // Valid names must start with an underscore or letter.
          const layerName = `_${slug}`;

          // Fix for https://github.com/mui/pigment-css/issues/199
          // Bring each file in its own layer so that the order is maintained between css modules
          // shared between layout.tsx and page.tsx.
          // TODO: Do this in a way that keeps the source map correct
          cssText = `
            @layer pigment.${layerName} {
              ${cssText}
            }
          `;
        }

        if (sourceMap && result.cssSourceMapText) {
          const map = Buffer.from(result.cssSourceMapText).toString('base64');
          cssText += `/*# sourceMappingURL=data:application/json;base64,${map}*/`;
        }

        // Virtual modules do not work consistently in Next.js (the build is done at least
        // thrice with different combination of parameters) resulting in error in
        // subsequent builds. So we use a placeholder CSS file with the actual CSS content
        // as part of the query params.
        if (isNext) {
          const data = `${meta.placeholderCssFile}?${btoa(
            encodeURI(
              encodeURIComponent(
                JSON.stringify({
                  filename: id.split(path.sep).pop(),
                  source: cssText,
                }),
              ),
            ),
          )}`;
          return {
            // CSS import should be the last so that nested components produce correct CSS order injection.
            code: `${result.code}\nimport ${JSON.stringify(data)};`,
            map: result.sourceMap,
          };
        }

        const cssFilename = path
          .normalize(`${id.replace(/\.[jt]sx?$/, '')}-${slug}.pigment.css`)
          .replace(/\\/g, path.posix.sep);

        const cssRelativePath = path
          .relative(projectPath, cssFilename)
          .replace(/\\/g, path.posix.sep);
        // Starting with null character so that it calls the resolver method (resolveId in line:430)
        // Otherwise, webpack tries to resolve the path directly
        const cssId = `\0${cssRelativePath}`;

        cssFileLookup.set(cssId, cssText);
        result.code += `\nimport ${JSON.stringify(cssId)};`;

        return {
          code: result.code,
          map: result.sourceMap,
        };
      } catch (e) {
        const error = new Error((e as Error).message);
        error.stack = (e as Error).stack;
        throw error;
      }
    },
  };

  const plugins: Array<UnpluginOptions> = [
    {
      name: 'pigment-css-plugin-theme-tokens',
      enforce: 'pre',
      webpack(compiler) {
        compiler.hooks.normalModuleFactory.tap(pluginName, (nmf) => {
          nmf.hooks.createModule.tap(
            pluginName,
            // @ts-expect-error CreateData is typed as 'object'...
            (createData: { matchResource?: string; settings: { sideEffects?: boolean } }) => {
              if (createData.matchResource && createData.matchResource.endsWith('.pigment.css')) {
                createData.settings.sideEffects = true;
              }
            },
          );
        });
      },
      ...(isNext
        ? {
            transformInclude(id) {
              return (
                // this file should exist in the package
                finalTransformLibraries.some(
                  (lib) =>
                    id.endsWith(`${lib}${path.sep}styles.css`) ||
                    id.includes(`${lib}${path.sep}theme`),
                ) ||
                // These are only to support local workspace development
                id.endsWith('/pigment-css-react/styles.css') ||
                id.includes('/pigment-css-react/theme')
              );
            },
            transform(code, id) {
              if (id.endsWith('styles.css')) {
                return theme ? generateTokenCss(theme) : code;
              }
              if (id.includes('theme')) {
                return generateThemeSource(theme);
              }
              return null;
            },
          }
        : {
            resolveId(source: string) {
              if (finalTransformLibraries.some((lib) => source === `${lib}/styles.css`)) {
                return VIRTUAL_CSS_FILE;
              }
              if (finalTransformLibraries.some((lib) => source === `${lib}/theme`)) {
                return VIRTUAL_THEME_FILE;
              }
              return null;
            },
            loadInclude(id) {
              return isZeroRuntimeThemeFile(id);
            },
            load(id) {
              if (id === VIRTUAL_CSS_FILE && theme) {
                return generateTokenCss(theme);
              }
              if (id === VIRTUAL_THEME_FILE) {
                return generateThemeSource(theme);
              }
              return null;
            },
          }),
    },
  ];

  if (transformSx) {
    plugins.push(babelTransformPlugin);
  }
  plugins.push(wywInJSTransformPlugin);

  // This is already handled separately for Next.js using `placeholderCssFile`
  if (!isNext) {
    plugins.push({
      name: 'pigment-css-plugin-load-output-css',
      enforce: 'pre',
      resolveId(id) {
        if (id[0] === '\0' && id.endsWith('.pigment.css')) {
          return { id };
        }
        return null;
      },
      loadInclude(id) {
        if (!id) {
          return false;
        }
        return id.endsWith('.pigment.css');
      },
      load(url: string) {
        const [id] = url.split('?', 1);
        return cssFileLookup.get(id);
      },
    });
  }
  return plugins;
});

export const webpack = plugin.webpack as unknown as UnpluginFactoryOutput<
  PigmentOptions,
  WebpackPluginInstance
>;

export { type AsyncResolver, extendTheme };
