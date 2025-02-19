import * as fs from 'node:fs';
import * as path from 'node:path';
import { expect as chaiExpect } from 'chai';
import { asyncResolveFallback } from '@wyw-in-js/shared';
import { TransformCacheCollection, createFileReporter, transform } from '@wyw-in-js/transform';
import * as prettier from 'prettier';
import { PigmentConfig, preprocessor, transformPigmentConfig } from '@pigment-css/utils';

import pkgJson from '../package.json';

type TransformOptions = {
  outputDir?: string;
} & PigmentConfig;

const shouldUpdateOutput = process.env.UPDATE_FIXTURES === 'true';

function replaceAbsolutePathInSourceMap(sourcemap: string) {
  const sourceMapJson = JSON.parse(sourcemap) as { sources: string[]; file: string };
  sourceMapJson.sources = sourceMapJson.sources.map((absPath) =>
    absPath.replace(process.cwd(), ''),
  );
  sourceMapJson.file = sourceMapJson.file.replace(process.cwd(), '');
  return JSON.stringify(sourceMapJson);
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

  const pluginOptions = transformPigmentConfig({
    babelOptions: {
      configFile: false,
      babelrc: false,
      plugins: ['@babel/plugin-syntax-jsx'],
    },
    tagResolver(source: string, tag: string) {
      if (source !== '@pigment-css/react-new') {
        return null;
      }
      const tagPath = pkgJson['wyw-in-js'].tags[tag] as string | undefined;
      if (!tagPath) {
        return null;
      }
      const res = tagPath.startsWith('.')
        ? require.resolve(`../${tagPath}`)
        : require.resolve(tagPath);
      return res;
    },
    ...restOptions,
  });

  const result = await transform(
    {
      options: {
        filename: inputFilePath,
        // preprocessor: (selector, css) => preprocessor(selector, css, options?.css),
        preprocessor,
        pluginOptions,
      },
      cache,
      eventEmitter,
    },
    inputContent,
    asyncResolveFallback,
  );

  const prettierConfig = await prettier.resolveConfig(
    path.join(process.cwd(), 'prettier.config.js'),
  );
  const formattedJs = await prettier.format(result.code, {
    ...prettierConfig,
    parser: 'babel',
  });
  // let formattedCss = await prettier.format(result.cssText ?? '', {
  //   ...prettierConfig,
  //   parser: 'css',
  // });
  const formattedCss =
    (result.cssText ?? '') +
    (result.cssSourceMapText
      ? `/*# sourceMappingURL=data:application/json;base64,${Buffer.from(replaceAbsolutePathInSourceMap(result.cssSourceMapText)).toString('base64')}*/`
      : '');

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
