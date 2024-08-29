import * as fs from 'node:fs';
import * as path from 'node:path';
import { expect as chaiExpect } from 'chai';
import { transformAsync } from '@babel/core';
import { asyncResolveFallback } from '@wyw-in-js/shared';
import {
  TransformCacheCollection,
  transform as wywTransform,
  createFileReporter,
} from '@wyw-in-js/transform';
import { matchAdapterPath, PluginCustomOptions, preprocessor } from '@pigment-css/react/utils';
import * as prettier from 'prettier';

import sxTransformPlugin from '../exports/sx-plugin';
import pkgJson from '../package.json';

type TransformOptions = PluginCustomOptions & {
  outputDir?: string;
};

const shouldUpdateOutput = process.env.UPDATE_FIXTURES === 'true';

function runSxTransform(code: string, filename: string) {
  return transformAsync(code, {
    babelrc: false,
    configFile: false,
    filename,
    plugins: ['@babel/plugin-syntax-jsx', [sxTransformPlugin]],
  });
}

export async function runTransformation(absolutePath: string, options?: TransformOptions) {
  const cache = new TransformCacheCollection();
  const { emitter: eventEmitter } = createFileReporter(false);
  const inputFilePath = absolutePath;
  const { outputDir, ...restOptions } = options ?? {};
  let outputFilePath = (
    outputDir ? path.join(outputDir, inputFilePath.split(path.sep).pop() as string) : absolutePath
  ).replace('.input.', '.output.');
  let outputCssFilePath = (
    outputDir ? path.join(outputDir, inputFilePath.split(path.sep).pop() as string) : absolutePath
  )
    .replace('.input.js', '.output.css')
    .replace('.input.jsx', '.output.css');

  if (!outputFilePath.includes('output')) {
    outputFilePath = outputFilePath.replace(path.extname(outputFilePath), '.output.js');
  }

  if (!outputCssFilePath.includes('output')) {
    outputCssFilePath = outputCssFilePath.replace(path.extname(outputCssFilePath), '.output.css');
  }

  const inputContent = fs.readFileSync(inputFilePath, 'utf8');
  let outputContent = fs.existsSync(outputFilePath) ? fs.readFileSync(outputFilePath, 'utf8') : '';
  let outputCssContent = fs.existsSync(outputCssFilePath)
    ? fs.readFileSync(outputCssFilePath, 'utf8')
    : '';

  const babelResult = await runSxTransform(inputContent, inputFilePath);

  const pluginOptions = {
    babelOptions: {
      configFile: false,
      babelrc: false,
      plugins: ['@babel/plugin-syntax-jsx'],
    },
    tagResolver(source: string, tag: string) {
      if (tag === 'default' && source.endsWith('/styled')) {
        return require.resolve(`../exports/styled`);
      }

      if (source !== '@pigment-css/react' && !matchAdapterPath(source)) {
        return null;
      }
      return require.resolve(`../${pkgJson['wyw-in-js'].tags[tag]}`.replace('.js', ''));
    },
    ...restOptions,
  };

  const result = await wywTransform(
    {
      options: {
        filename: inputFilePath,
        preprocessor: (selector, css) => preprocessor(selector, css, options?.css),
        pluginOptions,
      },
      cache,
      eventEmitter,
    },
    babelResult?.code ?? inputContent,
    asyncResolveFallback,
  );

  const prettierConfig = await prettier.resolveConfig(
    path.join(process.cwd(), 'prettier.config.js'),
  );
  const formattedJs = await prettier.format(result.code, {
    ...prettierConfig,
    parser: 'babel',
  });
  const formattedCss = await prettier.format(result.cssText ?? '', {
    ...prettierConfig,
    parser: 'css',
  });

  if (!outputContent || shouldUpdateOutput) {
    fs.mkdirSync(path.dirname(outputFilePath), { recursive: true });
    fs.writeFileSync(outputFilePath, formattedJs, 'utf-8');
    outputContent = formattedJs;
  }

  if (!outputCssContent || shouldUpdateOutput) {
    fs.mkdirSync(path.dirname(outputCssFilePath), { recursive: true });
    fs.writeFileSync(outputCssFilePath, formattedCss, 'utf-8');
    outputCssContent = formattedCss;
  }

  return {
    output: {
      js: formattedJs,
      css: formattedCss,
    },
    fixture: {
      js: outputContent,
      css: outputCssContent,
    },
  };
}

export function expect(val: any): ReturnType<typeof chaiExpect> {
  const CUSTOM_ERROR =
    'The file contents have changed. Run "test:update" command to update the file if this is expected.';
  return chaiExpect(val, CUSTOM_ERROR);
}
