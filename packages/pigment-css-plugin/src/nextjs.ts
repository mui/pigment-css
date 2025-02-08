import * as path from 'node:path';
import type { NextConfig } from 'next';
import { findPagesDir } from 'next/dist/lib/find-pages-dir';

import webpackPlugin from './webpack';
import type { ExcludePluginOptions } from './utils';

const NEXTJS_ARTIFACTS = 'nextjs-artifacts';

const extractionFile = path.join(
  path.dirname(require.resolve('../package.json')),
  NEXTJS_ARTIFACTS,
  'pigment-virtual.css',
);

type WebpackError = {
  module?: {
    matchResource: string;
  };
  details?: string;
  message?: string;
  file?: string;
};

export type PigmentCSSConfig = Omit<Parameters<typeof webpackPlugin>[0], ExcludePluginOptions>;

export default function pigment(
  nextConfig: NextConfig,
  pigmentConfig?: Parameters<typeof webpackPlugin>[0],
) {
  const { babelOptions = {}, asyncResolve, ...other } = pigmentConfig ?? {};
  if (process.env.TURBOPACK === '1') {
    // eslint-disable-next-line no-console
    console.warn(
      `\x1B[33m${process.env.PACKAGE_NAME}: Turbo mode is not supported yet. Please disable it by removing the "--turbo" flag from your "next dev" command to use Pigment CSS.\x1B[39m`,
    );
    return nextConfig;
  }

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

    config.module.rules.push({
      test: /pigment-virtual\.css$/,
      use: require.resolve('./nextjs-css-loader'),
    });
    config.plugins.push(
      webpackPlugin({
        ...other,
        nextJsOptions: {
          dev,
          isServer,
          placeholderCssFile: extractionFile,
          projectPath: dir,
        },
        outputCss: dev || hasAppDir || !isServer,
        async asyncResolve(what: string, importer: string, stack: string[]) {
          // Using the same stub file as "next/font". Should be updated in future to
          // use it's own stub depdending on the actual usage.
          if (what.startsWith('__barrel_optimize__')) {
            return require.resolve(`../${NEXTJS_ARTIFACTS}/next-font`);
          }
          if (what === 'next/image' || what === 'next/link') {
            return require.resolve(`../${NEXTJS_ARTIFACTS}/next-image`);
          }
          if (what.startsWith('next/font')) {
            return require.resolve(`../${NEXTJS_ARTIFACTS}/next-font`);
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

    config.ignoreWarnings = config.ignoreWarnings ?? [];
    config.ignoreWarnings.push((error: WebpackError) => {
      if (error.module?.matchResource && /pigment-virtual\.css$/) {
        return true;
      }
      return /(autoprefixer)/gm.test(error.message as string);
    });

    if (typeof nextConfig.webpack === 'function') {
      return nextConfig.webpack(config, context);
    }
    return config;
  };
  return {
    ...nextConfig,
    webpack,
  };
}
