import * as path from 'node:path';
import * as fs from 'node:fs';
import type { NextConfig } from 'next';
import { findPagesDir } from 'next/dist/lib/find-pages-dir';
import { webpack as webpackPlugin, extendTheme, type PigmentOptions } from '@pigment-css/unplugin';
import { slugify } from '@wyw-in-js/shared';
import { generateTokenCss } from '@pigment-css/react/utils';

export { type PigmentOptions };

const extractionFile = path.join(
  path.dirname(require.resolve('../package.json')),
  'zero-virtual.css',
);

function scanDirectory(dir: string, fileList: string[] = []): string[] {
  const dirName = path.basename(dir);
  if (
    dirName === 'node_modules' ||
    dirName === '.next' ||
    dirName === '.git' ||
    dir === path.resolve(__dirname, '..', 'virtual')
  ) {
    return fileList;
  }
  try {
    const files = fs.readdirSync(dir, { withFileTypes: true });
    files.forEach((file) => {
      const fullPath = path.join(dir, file.name);
      if (file.isDirectory()) {
        scanDirectory(fullPath, fileList);
      } else if (file.isFile() && /\.(tsx|ts|jsx|js)$/.test(file.name)) {
        fileList.push(fullPath);
      }
    });
  } catch {
    // Ignore
  }
  return fileList;
}

export function withPigment(nextConfig: NextConfig, pigmentConfig?: PigmentOptions) {
  const { babelOptions = {}, asyncResolve, ...other } = pigmentConfig ?? {};

  // === Turbopack configuration (always prepared) ===
  const virtualDir = path.resolve(__dirname, '../virtual');

  if (!fs.existsSync(virtualDir)) {
    fs.mkdirSync(virtualDir, { recursive: true });
  }
  // Pre-create virtual CSS files for all source files to bypass Turbopack's startup resolver cache
  const sourceFiles = scanDirectory(process.cwd());
  const activeSlugs = new Set<string>();

  sourceFiles.forEach((file) => {
    const slug = slugify(file);
    const cssFileName = `${slug}.css`;
    activeSlugs.add(cssFileName);
    const cssPath = path.join(virtualDir, cssFileName);
    if (!fs.existsSync(cssPath)) {
      fs.writeFileSync(cssPath, '', 'utf8');
    }
  });
  try {
    const files = fs.readdirSync(virtualDir);
    files.forEach((file) => {
      if (file.endsWith('.css') && !activeSlugs.has(file)) {
        fs.rmSync(path.join(virtualDir, file), { force: true });
      }
    });
  } catch {
    // Ignore
  }
  const cacheDir = path.resolve(process.cwd(), '.next/cache');
  if (!fs.existsSync(cacheDir)) {
    fs.mkdirSync(cacheDir, { recursive: true });
  }
  const themeCachePath = path.join(cacheDir, 'pigment-theme.json');
  const serializedTheme = JSON.stringify(other.theme ?? {}, (_key, value) => {
    if (typeof value === 'function') {
      return undefined;
    }
    return value;
  });
  fs.writeFileSync(themeCachePath, serializedTheme, 'utf8');

  // Pre-generate token CSS while the full theme (with functions) is still available.
  // JSON serialization strips generateStyleSheets, so generateTokenCss would return empty in the loader.
  const tokenCssCachePath = path.join(cacheDir, 'pigment-token.css');
  const tokenCss = generateTokenCss(other.theme);
  fs.writeFileSync(tokenCssCachePath, tokenCss, 'utf8');

  const turbopackLoaderItem = {
    loader: require.resolve('./turbopack-loader'),
    options: {
      themeCachePath,
      tokenCssCachePath,
      transformLibraries: other.transformLibraries ?? [],
      babelOptions: babelOptions ?? {},
      css: other.css ?? null,
    },
  };

  const turbopackNewRules = {
    '*.ts': { loaders: [turbopackLoaderItem] },
    '*.tsx': { loaders: [turbopackLoaderItem] },
    '*.js': { loaders: [turbopackLoaderItem] },
    '*.jsx': { loaders: [turbopackLoaderItem] },
    '*.css': { loaders: [turbopackLoaderItem] },
  };

  type TurbopackRule = { loaders: Array<Record<string, unknown>> };
  type TurbopackRules = Record<string, TurbopackRule>;

  const mergeTurbopackRules = (
    rulesToMerge: TurbopackRules,
    existingRules: TurbopackRules = {},
  ): TurbopackRules => {
    const mergedRules: TurbopackRules = { ...existingRules };
    Object.entries(rulesToMerge).forEach(([key, rule]) => {
      const existing = mergedRules[key];
      if (existing) {
        mergedRules[key] = {
          ...existing,
          loaders: [...rule.loaders, ...existing.loaders],
        };
      } else {
        mergedRules[key] = rule;
      }
    });
    return mergedRules;
  };

  const nextConfigWithTurbo = nextConfig as NextConfig & {
    turbopack?: {
      rules?: TurbopackRules;
      resolveAlias?: Record<string, string>;
    };
  };

  // === Webpack configuration (lazy — only executed when Webpack is actually used) ===
  const originalWebpack = nextConfig.webpack;

  const webpack: Exclude<NextConfig['webpack'], undefined> = (config, context) => {
    const { dir, dev, isServer, config: resolvedNextConfig } = context;

    const findPagesDirResult = findPagesDir(
      dir,
      // @ts-expect-error next.js v12 accepts 2 arguments, while v13 only accepts 1
      resolvedNextConfig.experimental?.appDir ?? false,
    );

    let hasAppDir = false;

    if ('appDir' in resolvedNextConfig.experimental) {
      hasAppDir =
        !!resolvedNextConfig.experimental.appDir &&
        !!(findPagesDirResult && findPagesDirResult.appDir);
    } else {
      hasAppDir = !!(findPagesDirResult && findPagesDirResult.appDir);
    }

    config.module.rules.unshift({
      enforce: 'pre',
      test: (filename: string) => filename.endsWith('zero-virtual.css'),
      use: require.resolve('../loader'),
    });
    config.plugins.push(
      webpackPlugin({
        ...other,
        meta: {
          type: 'next',
          dev,
          isServer,
          outputCss: dev || hasAppDir || !isServer,
          placeholderCssFile: extractionFile,
          projectPath: dir,
        },
        async asyncResolve(what: string, importer: string, stack: string[]) {
          // Using the same stub file as "next/font". Should be updated in future to
          // use it's own stub depdending on the actual usage.
          if (what.startsWith('__barrel_optimize__')) {
            return require.resolve('../next-font');
          }
          if (what === 'next/image' || what === 'next/link') {
            return require.resolve('../next-image');
          }
          if (what.startsWith('next/font')) {
            return require.resolve('../next-font');
          }
          if (what.startsWith('@emotion/styled') || what.startsWith('styled-components')) {
            return require.resolve('../third-party-styled');
          }
          // Need to point to the react from node_modules during eval time.
          // Otherwise, next makes it point to its own version of react that
          // has a lot of RSC specific logic which is not actually needed.
          if (
            what === 'react' ||
            what.startsWith('react/') ||
            what.startsWith('react-dom/') ||
            what.startsWith('@babel/') ||
            what.startsWith('next/')
          ) {
            return require.resolve(what);
          }
          if (asyncResolve) {
            return asyncResolve(what, importer, stack);
          }
          return null;
        },
        babelOptions: {
          ...babelOptions,
          presets: [...(babelOptions?.presets ?? []), 'next/babel'],
        },
      }),
    );

    if (typeof originalWebpack === 'function') {
      return originalWebpack(config, context);
    }
    config.ignoreWarnings = config.ignoreWarnings ?? [];
    config.ignoreWarnings.push({
      module: /(zero-virtual\.css)|(react\/styles\.css)/,
    });
    return config;
  };

  // === Return both turbopack and webpack configs ===
  return {
    ...nextConfigWithTurbo,
    turbopack: {
      ...nextConfigWithTurbo.turbopack,
      rules: mergeTurbopackRules(turbopackNewRules, nextConfigWithTurbo.turbopack?.rules),
      resolveAlias: {
        ...nextConfigWithTurbo.turbopack?.resolveAlias,
        '@pigment-css/nextjs-plugin/virtual': virtualDir,
      },
    },
    webpack,
  };
}

export { extendTheme };
