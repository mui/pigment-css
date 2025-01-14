import * as fs from 'node:fs';
import * as path from 'node:path';
/**
 * @param {string[]} plugins
 */
function generateExports(plugins) {
  const exportsDir = path.join(process.cwd(), 'exports');
  if (!fs.existsSync(exportsDir)) {
    fs.mkdirSync(exportsDir);
  }

  plugins.forEach((plugin) => {
    const contentEsm = `
import { pigment } from '../build/${plugin}.mjs';

export default pigment;
`;
    const contentCjs = `
const plugin = require('../build/${plugin}.js');

module.exports = plugin.pigment;
module.exports.default = plugin.pigment;
`;
    fs.writeFileSync(path.join(exportsDir, `${plugin}.mjs`), contentEsm, 'utf8');
    fs.writeFileSync(path.join(exportsDir, `${plugin}.js`), contentCjs, 'utf8');
    fs.writeFileSync(
      path.join(exportsDir, `${plugin}.d.mts`),
      `export {pigment as default} from '../build/${plugin}'`,
      'utf8',
    );
    fs.writeFileSync(
      path.join(exportsDir, `${plugin}.d.ts`),
      `export {pigment as default} from '../build/${plugin}'`,
      'utf8',
    );
  });
}

generateExports(['webpack', 'vite', 'nextjs']);
