import * as path from 'node:path';
import { transformAsync } from '@babel/core';
import {
  generateCssFromTheme,
  babelPlugin as sxBabelPlugin,
  generateThemeWithCssVars,
  preprocessor as basePreProcessor,
} from '@pigment-css/utils';
import type { PigmentConfig } from '@pigment-css/utils';
import type { Theme } from '@pigment-css/theme';
import { createUnplugin, type UnpluginOptions } from 'unplugin';
import {
  createFileReporter,
  getFileIdx,
  IFileReporterOptions,
  Result,
  TransformCacheCollection,
  transform as wywTransform,
} from '@wyw-in-js/transform';
import { createFilter, type FilterPattern } from '@rollup/pluginutils';
import { logger as wywLogger } from '@wyw-in-js/shared';

import { AsyncResolver, handleUrlReplacement } from './utils';

type BundlerConfig = Omit<PigmentConfig, 'themeArgs'> & {
  include?: FilterPattern;
  exclude?: FilterPattern;
  theme?: Theme;
  corePackages?: string[];
  transformSx?: boolean;
  nextJsOptions?: {
    dev: boolean;
    isServer: boolean;
    projectPath: string;
    placeholderCssFile: string;
  };
  outputCss?: boolean;
  debug?: IFileReporterOptions | false;
  sourceMap?: boolean;
  asyncResolve?: AsyncResolver;
  createResolver?: (ctx: any, projectPath: string, config?: any) => AsyncResolver;
  postTransform?: (result: Result, fileName: string, cssFilename: string) => Promise<void>;
};

const DEFAULT_CORE_PACKAGES = ['@pigment-css/core', '@pigment-css/react-new'];
const VIRTUAL_CSS_FILE = `\0pigment-runtime-styles.css`;
const VIRTUAL_THEME_FILE = `\0pigment-runtime-theme.js`;

const extensions = ['.js', '.jsx', '.mjs', '.cjs', '.ts', '.tsx', '.mts', '.cts'];

function hasCorrectExtension(fileName: string) {
  return extensions.some((ext) => fileName.endsWith(ext));
}

function isZeroRuntimeThemeFile(fileName: string) {
  return fileName === VIRTUAL_CSS_FILE || fileName === VIRTUAL_THEME_FILE;
}

function isZeroRuntimeProcessableFile(fileName: string, transformLibraries: string[]) {
  if (!fileName) {
    return false;
  }
  if (fileName.includes('packages/pigment-css')) {
    return false;
  }
  const isNodeModule = fileName.includes('node_modules');
  const isTransformableFile =
    isNodeModule && transformLibraries.some((libName) => fileName.includes(libName));
  return hasCorrectExtension(fileName) && (isTransformableFile || !isNodeModule);
}

function getSxBabelUnplugin({
  name,
  finalTransformLibraries,
  filter,
}: {
  name: string;
  finalTransformLibraries: string[];
  filter: ReturnType<typeof createFilter>;
}) {
  const babelTransformPlugin: UnpluginOptions = {
    name,
    enforce: 'post',
    transformInclude(id) {
      return (
        isZeroRuntimeProcessableFile(id.split('?', 1)[0], finalTransformLibraries) && filter(id)
      );
    },
    async transform(code, id) {
      try {
        const result = await transformAsync(code, {
          filename: id,
          babelrc: false,
          configFile: false,
          plugins: [[sxBabelPlugin]],
        });
        if (!result) {
          return null;
        }
        return {
          code: result.code ?? code,
          map: result.map,
        };
      } catch (ex) {
        console.error(ex);
        return null;
      }
    },
  };
  return babelTransformPlugin;
}

type ResolvedViteConfig = {
  root: string;
};

function innerNoop() {
  return null;
}

function outerNoop() {
  return innerNoop;
}

/**
 * Next.js initializes the plugin multiple times. So all the calls
 * have to share the same Maps.
 */
const globalCssFileLookup = new Map<string, string>();

export const plugin = createUnplugin<BundlerConfig>((options, meta) => {
  const plugins: UnpluginOptions[] = [];
  const {
    outputCss = true,
    theme = {},
    corePackages = [],
    debug = false,
    transformSx = true,
    nextJsOptions,
    overrideContext,
    tagResolver,
    asyncResolve: asyncResolveOpt,
    sourceMap = false,
    postTransform,
    createResolver,
    include = [],
    exclude = [],
    ...rest
  } = options;
  const filter = createFilter(include, exclude);
  const runtimePackages = Array.from(new Set(DEFAULT_CORE_PACKAGES.concat(corePackages)));
  const cssFileLookup = nextJsOptions ? globalCssFileLookup : new Map<string, string>();
  const baseName = `${process.env.PACKAGE_NAME}/${meta.framework}`;
  const cache = new TransformCacheCollection();
  const { emitter, onDone } = createFileReporter(debug);
  let projectPath = nextJsOptions?.projectPath ?? process.cwd();

  const themePlugin: UnpluginOptions = {
    name: `${baseName}/theme`,
    enforce: 'pre',
    webpack(compiler) {
      compiler.hooks.normalModuleFactory.tap(baseName, (nmf) => {
        nmf.hooks.createModule.tap(
          baseName,
          // @ts-expect-error CreateData is typed as 'object'...
          (createData: { matchResource?: string; settings: { sideEffects?: boolean } }) => {
            if (
              createData.matchResource &&
              createData.matchResource.endsWith('.virtual.pigment.css')
            ) {
              createData.settings.sideEffects = true;
            }
          },
        );
      });
    },
    ...(nextJsOptions
      ? {
          transformInclude(id) {
            return runtimePackages.some(
              // @TODO - Add check for workspace
              (lib) =>
                id.endsWith(`${lib}${path.sep}styles.css`) || id.includes(`${lib}${path.sep}theme`),
            );
          },
          transform(_code, id) {
            if (id.endsWith('styles.css')) {
              return generateCssFromTheme('vars' in theme ? theme.vars : theme);
            }
            if (id.includes('theme')) {
              return 'export default {}';
            }
            return null;
          },
        }
      : {
          resolveId(source) {
            if (runtimePackages.some((lib) => source === `${lib}${path.sep}styles.css`)) {
              return VIRTUAL_CSS_FILE;
            }
            if (runtimePackages.some((lib) => source === `${lib}${path.sep}theme`)) {
              return VIRTUAL_THEME_FILE;
            }
            return null;
          },
          loadInclude(id) {
            return isZeroRuntimeThemeFile(id);
          },
          load(id) {
            if (id === VIRTUAL_CSS_FILE) {
              // @TODO
              return generateCssFromTheme(theme);
            }
            if (id === VIRTUAL_THEME_FILE) {
              // @TODO
              return '// theme source\n export default {}';
            }
            return null;
          },
        }),
  };

  const themeWithVars = 'vars' in theme ? theme : generateThemeWithCssVars(theme);

  if (theme) {
    plugins.push(themePlugin);
  }

  if (transformSx) {
    plugins.push(
      getSxBabelUnplugin({
        name: `${baseName}/sx`,
        finalTransformLibraries: runtimePackages,
        filter,
      }),
    );
  }

  const presets = new Set(
    Array.isArray(rest.babelOptions?.presets) ? rest.babelOptions?.presets : [],
  );

  const wywPlugin: UnpluginOptions = {
    name: `${baseName}/pigment`,
    enforce: 'post',
    buildEnd() {
      onDone(projectPath);
    },
    vite: {
      configResolved(resolvedConfig: ResolvedViteConfig) {
        projectPath = resolvedConfig.root;
      },
      configureServer() {
        // do stuff related to hot reloads.
      },
    },
    transformInclude(id) {
      return isZeroRuntimeProcessableFile(id.split('?', 1)[0], runtimePackages) && filter(id);
    },
    async transform(code, url) {
      const [filePath] = url.split('?', 1);
      const filename = path.normalize(filePath);
      const log = wywLogger.extend(nextJsOptions ? 'nextjs' : meta.framework);
      log('Transform', getFileIdx(filename));
      const pluginResolver = (
        createResolver as Exclude<BundlerConfig['createResolver'], undefined>
      )(this, projectPath);
      const asyncResolver: AsyncResolver = async (what, importer, stack) => {
        const result = await asyncResolveOpt?.(what, importer, stack);
        if (result) {
          return result;
        }
        return pluginResolver(what, importer, stack) ?? null;
      };

      const babelPlugins = [
        meta.framework === 'vite' ? '@babel/plugin-syntax-typescript' : '',
        'babel-plugin-define-var',
        ...(rest.babelOptions?.plugins ?? []),
      ].filter(Boolean);
      const result = await wywTransform(
        {
          options: {
            filename,
            root: projectPath,
            // @TODO - Handle RTL processing
            preprocessor: basePreProcessor,
            pluginOptions: {
              ...rest,
              // @ts-ignore WyW does not identify this property
              themeArgs: {
                theme: 'vars' in theme ? theme : themeWithVars,
              },
              features: {
                useWeakRefInEval: false,
                ...rest.features,
              },
              babelOptions: {
                ...rest.babelOptions,
                plugins: babelPlugins,
                presets: !(filename.endsWith('ts') || filename.endsWith('tsx'))
                  ? Array.from(presets)
                  : Array.from(presets).concat('@babel/preset-typescript'),
              },
              overrideContext(context, file) {
                if (!context.$RefreshSig$) {
                  context.$RefreshSig$ = outerNoop;
                }
                if (overrideContext) {
                  return overrideContext(context, file);
                }

                return context;
              },
              tagResolver(source: string, tag: string) {
                const tagResult = tagResolver?.(source, tag);
                if (tagResult) {
                  return tagResult;
                }
                return null;
              },
            },
          },
          cache,
          eventEmitter: emitter,
        },
        code,
        asyncResolver,
      );

      if (typeof result.cssText !== 'string') {
        return null;
      }

      if (!outputCss) {
        return {
          code: result.code,
          map: result.sourceMap,
        };
      }

      if (nextJsOptions && result.cssText.includes('url(')) {
        result.cssText = await handleUrlReplacement(
          result.cssText,
          filename,
          asyncResolver,
          projectPath,
        );
      }

      if (sourceMap && result.cssSourceMapText) {
        const map = Buffer.from(result.cssSourceMapText).toString('base64');
        result.cssText += `/*# sourceMappingURL=data:application/json;base64,${map}*/`;
      }

      if (nextJsOptions) {
        const data = `${nextJsOptions.placeholderCssFile}?${btoa(
          encodeURI(
            encodeURIComponent(
              JSON.stringify({
                filename: filename.split(path.sep).pop(),
                source: result.cssText,
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
        .normalize(`${filename.replace(/\.[jt]sx?$/, '')}.virtual.pigment.css`)
        .replace(/\\/g, path.posix.sep);

      const cssRelativePath = path
        .relative(projectPath, cssFilename)
        .replace(/\\/g, path.posix.sep);
      // Starting with null character so that it calls the resolver method (resolveId in line:430)
      // Otherwise, webpack tries to resolve the path directly
      const cssId = `\0${cssRelativePath}`;

      cssFileLookup.set(cssId, result.cssText);
      result.code += `\nimport ${JSON.stringify(cssId)};`;

      if (postTransform) {
        await postTransform.call(this, result, filename, cssId);
      }

      return {
        code: result.code,
        map: result.sourceMap,
      };
    },
  };

  if (!nextJsOptions) {
    const outputCssPlugin: UnpluginOptions = {
      name: `${baseName}/output-css`,
      enforce: 'pre',
      resolveId(id) {
        if (id[0] === '\0' && id.endsWith('.virtual.pigment.css')) {
          return { id };
        }
        return null;
      },
      loadInclude(id) {
        if (!id) {
          return false;
        }
        return id.endsWith('.virtual.pigment.css');
      },
      load(url: string) {
        const [id] = url.split('?', 1);
        return cssFileLookup.get(id);
      },
    };

    // @TODO - Check if we need updateConfigPlugin from 'vite-plugin/src/index.ts'

    plugins.push(outputCssPlugin);
  }

  plugins.push(wywPlugin);

  return plugins;
});
