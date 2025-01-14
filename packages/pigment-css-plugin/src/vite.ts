import { existsSync } from 'node:fs';
import { type Rollup, optimizeDeps, Plugin, ViteDevServer } from 'vite';
import { syncResolve } from '@wyw-in-js/shared';

import { plugin } from './unplugin';
import { AsyncResolver } from './utils';

export function pigment(config: Parameters<(typeof plugin)['vite']>[0]) {
  function createResolver(
    ctx: Rollup.TransformPluginContext,
    _projectPath: string,
    viteConfig?: any,
  ): AsyncResolver {
    return async (what, importer, stack) => {
      const resolved = await ctx.resolve(what, importer);
      if (resolved) {
        if (resolved.external) {
          // If module is marked as external, Rollup will not resolve it,
          // so we need to resolve it ourselves with default resolver
          const resolvedId = syncResolve(what, importer, stack);
          return resolvedId;
        }

        // Vite adds param like `?v=667939b3` to cached modules
        const resolvedId = resolved.id.split('?', 1)[0];

        if (resolvedId.startsWith('\0')) {
          // \0 is a special character in Rollup that tells Rollup to not include this in the bundle
          // https://rollupjs.org/guide/en/#outputexports
          return null;
        }

        if (!existsSync(resolvedId) && viteConfig) {
          await optimizeDeps(viteConfig);
        }

        return resolvedId;
      }

      throw new Error(`Could not resolve ${what}`);
    };
  }
  const targets: { dependencies: string[]; id: string }[] = [];

  let devServer: ViteDevServer;

  const vitePlugin = plugin.vite({
    ...config,
    createResolver,
    async postTransform(this: Rollup.TransformPluginContext, result, fileName, cssFilename) {
      const { dependencies = [] } = result;

      for (let i = 0, end = dependencies.length; i < end; i += 1) {
        // eslint-disable-next-line no-await-in-loop
        const depModule = await this.resolve(dependencies[i], fileName, {
          isEntry: false,
        });
        if (depModule) {
          dependencies[i] = depModule.id;
        }
      }
      const target = targets.find((t) => t.id === fileName);
      if (!target) {
        targets.push({ id: fileName, dependencies });
      } else {
        target.dependencies = dependencies;
      }
      // Reload the contents of the CSS file in the dev server
      if (devServer?.moduleGraph) {
        const cssModule = devServer.moduleGraph.getModuleById(cssFilename);
        if (cssModule) {
          devServer.reloadModule(cssModule);
        }
      }
    },
  });

  return vitePlugin;
}
