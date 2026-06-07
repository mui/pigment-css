import * as fs from 'node:fs';
import * as path from 'node:path';
import { transform, TransformCacheCollection, type Result } from '@wyw-in-js/transform';
import { slugify } from '@wyw-in-js/shared';
import {
  matchAdapterPath,
  preprocessor as basePreprocessor,
  generateThemeSource,
} from '@pigment-css/react/utils';
import { styledEngineMockup } from '@pigment-css/react/internal';

const cache = new TransformCacheCollection();

const stripQueryAndHash = (request: string): string => {
  const queryIdx = request.indexOf('?');
  const hashIdx = request.indexOf('#');
  if (queryIdx === -1) {
    return hashIdx === -1 ? request : request.slice(0, hashIdx);
  }
  if (hashIdx === -1) {
    return request.slice(0, queryIdx);
  }
  return request.slice(0, Math.min(queryIdx, hashIdx));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function turbopackLoader(this: any, content: string) {
  const callback = this.async();

  const {
    themeCachePath,
    transformLibraries = [],
    babelOptions = {},
    ...other
  } = this.getOptions() || {};

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let theme: Record<string, any> = {};
  if (themeCachePath && fs.existsSync(themeCachePath)) {
    try {
      const themeJson = fs.readFileSync(themeCachePath, 'utf8');
      theme = JSON.parse(themeJson);
    } catch (e) {
      // Ignore
    }
  }

  // Hydrate theme helper functions for evaluation sandbox
  theme.getColorSchemeSelector = (colorScheme: string) => {
    if (!theme.getSelector) {
      return `@media (prefers-color-scheme: ${colorScheme})`;
    }
    return `:where(${theme.getSelector(colorScheme, {})}) &`;
  };

  theme.applyStyles = function applyStyles(colorScheme: string, styles: Record<string, unknown>) {
    return {
      [this.getColorSchemeSelector(colorScheme)]: styles,
    };
  };

  const defaultLibs = ['@pigment-css/react', '@mui/material-pigment-css'];
  const allLibs = transformLibraries.concat(defaultLibs);
  const finalTransformLibraries = allLibs.map((lib: string) => lib.split('/').join(path.sep));

  const resourcePath = this.resourcePath;

  const isStylesCss = finalTransformLibraries.some(
    (lib: string) =>
      resourcePath.endsWith(`${lib}${path.sep}styles.css`) ||
      resourcePath.endsWith('/pigment-css-react/styles.css'),
  );

  const isThemeFile = finalTransformLibraries.some(
    (lib: string) =>
      resourcePath.includes(`${lib}${path.sep}theme`) ||
      resourcePath.includes('/pigment-css-react/theme'),
  );

  if (isStylesCss) {
    const { tokenCssCachePath } = this.getOptions() || {};
    let cssText = '';
    if (tokenCssCachePath && fs.existsSync(tokenCssCachePath)) {
      cssText = fs.readFileSync(tokenCssCachePath, 'utf8');
    }
    return callback(null, cssText);
  }

  if (isThemeFile) {
    const themeSource = generateThemeSource(theme);
    return callback(null, themeSource);
  }

  if (resourcePath.endsWith('.css')) {
    return callback(null, content);
  }

  const resolveModule = this.getResolve({
    dependencyType: 'esm',
  });

  const asyncResolve = async (token: string, importer: string): Promise<string> => {
    // 1. Resolve mocks and stubs for Next.js/React evaluation
    if (token.startsWith('__barrel_optimize__')) {
      return require.resolve('../next-font');
    }
    if (token === 'next/image' || token === 'next/link') {
      return require.resolve('../next-image');
    }
    if (token.startsWith('next/font')) {
      return require.resolve('../next-font');
    }
    if (token.startsWith('@emotion/styled') || token.startsWith('styled-components')) {
      return require.resolve('../third-party-styled');
    }
    if (
      token === 'react' ||
      token.startsWith('react/') ||
      token.startsWith('react-dom/') ||
      token.startsWith('@babel/') ||
      token.startsWith('next/')
    ) {
      return require.resolve(token);
    }

    // 2. Fallback to standard resolution
    const context = path.isAbsolute(importer)
      ? path.dirname(importer)
      : path.join(process.cwd(), path.dirname(importer));

    const result = await new Promise<string>((resolve, reject) => {
      resolveModule(context, token, (err: Error | null, res: string) => {
        if (err) {
          reject(err);
        } else if (res) {
          resolve(res);
        } else {
          reject(new Error(`Cannot resolve ${token}`));
        }
      });
    });

    const filePath = stripQueryAndHash(result);
    if (path.isAbsolute(filePath)) {
      this.addDependency(filePath);
    }
    return result;
  };

  const plugins = [
    require.resolve('@pigment-css/react/exports/remove-prop-types-plugin'),
    'babel-plugin-define-var',
    ...(babelOptions?.plugins ?? []),
  ];

  const transformServices = {
    options: {
      filename: this.resourcePath,
      root: process.cwd(),
      preprocessor: (selector: string, cssText: string) => {
        return basePreprocessor(selector, cssText, other.css);
      },
      pluginOptions: {
        ...other,
        themeArgs: {
          theme,
        },
        packageMap: transformLibraries.reduce(
          (acc: Record<string, string>, lib: string) => {
            acc[lib] = lib;
            return acc;
          },
          {} as Record<string, string>,
        ),
        features: {
          useWeakRefInEval: false,
          ...other.features,
        },
        overrideContext(context: Record<string, unknown>) {
          if (!context.$RefreshSig$) {
            context.$RefreshSig$ = () => () => {};
          }
          // Mock styled engine to prevent runtime styled component errors in evaluation
          const originalRequire = context.require as (id: string) => unknown;
          context.require = (id: string) => {
            if (id === '@mui/styled-engine' || id === '@mui/styled-engine-sc') {
              return styledEngineMockup;
            }
            return originalRequire(id);
          };
          return context;
        },
        tagResolver(source: string, tag: string) {
          if (matchAdapterPath(source)) {
            return require.resolve(`@pigment-css/react/exports/${tag}`);
          }
          return null;
        },
        babelOptions: {
          ...babelOptions,
          plugins,
          presets: [
            ...(babelOptions?.presets ?? []),
            require.resolve('@babel/preset-typescript'),
            [require.resolve('@babel/preset-react'), { runtime: 'automatic' }],
          ],
        },
      },
    },
    cache,
  };

  return transform(transformServices, content, asyncResolve)
    .then(async (result: Result) => {
      if (result.cssText) {
        const slug = slugify(this.resourcePath);
        const virtualDir = path.resolve(__dirname, '..', 'virtual');
        if (!fs.existsSync(virtualDir)) {
          fs.mkdirSync(virtualDir, { recursive: true });
        }
        const cssFilePath = path.join(virtualDir, `${slug}.css`);

        let { cssText } = result;

        // Wrap in @layer to maintain CSS ordering between layout.tsx and page.tsx,
        // matching the webpack unplugin behavior.
        const cssSlug = slugify(cssText);
        const layerName = `_${cssSlug}`;
        cssText = `@layer pigment.${layerName} {\n${cssText}\n}\n`;

        fs.writeFileSync(cssFilePath, cssText, 'utf8');

        // Import the written CSS file relatively via package name to bypass global CSS imports check
        const finalCode = `${result.code}\nimport "@pigment-css/nextjs-plugin/virtual/${slug}.css";`;
        callback(null, finalCode, result.sourceMap ?? undefined);
      } else {
        callback(null, result.code, result.sourceMap ?? undefined);
      }
    })
    .catch((err: Error) => {
      callback(err);
    });
}
