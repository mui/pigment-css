import * as path from 'node:path';

import { NativeBuildContext } from 'unplugin';

import { plugin } from './unplugin';
import { AsyncResolver } from './utils';

export type PigmentCSSConfig = Exclude<
  Parameters<(typeof plugin)['webpack']>[0],
  'createResolver' | 'postTransform'
>;

export default function pigment(config: Parameters<(typeof plugin)['webpack']>[0]) {
  function createResolver(ctx: NativeBuildContext, projectPath: string): AsyncResolver {
    return async (what, importer) => {
      if (ctx.framework !== 'webpack') {
        throw new Error('Non-webpack bundlers not supported');
      }

      const context = path.isAbsolute(importer)
        ? path.dirname(importer)
        : path.join(projectPath, path.dirname(importer));
      return new Promise((resolve, reject) => {
        ctx.loaderContext!.resolve(context, what, (err, result) => {
          if (err) {
            reject(err);
          } else if (result) {
            ctx.loaderContext!.addDependency(result);
            resolve(result);
          } else {
            reject(new Error(`${process.env.PACKAGE_NAME}: Cannot resolve ${what}`));
          }
        });
      });
    };
  }
  return plugin.webpack({
    ...config,
    createResolver,
  });
}
