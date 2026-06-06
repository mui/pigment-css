/**
 * Virtual CSS file path used for zero-runtime styles.
 * @constant {string}
 */
export const VIRTUAL_CSS_FILE = `\0zero-runtime-styles.css`;
/**
 * Virtual theme module path used for zero-runtime theme.
 * @constant {string}
 */
export const VIRTUAL_THEME_FILE = `\0zero-runtime-theme.js`;

/**
 * Resolves import paths to virtual modules for Pigment CSS artifacts.
 * @param {string} source - Original import source path
 * @param {string[]} allLibs - List of library names to match against
 * @returns {string | null} Virtual module path if matched, otherwise null
 */
export function resolvePigmentPath(source: string, allLibs: string[]) {
  if (allLibs.some((lib) => source.includes(`${lib}/styles.css`))) {
    return VIRTUAL_CSS_FILE;
  }
  if (allLibs.some((lib) => source.includes(`${lib}/theme`))) {
    return VIRTUAL_THEME_FILE;
  }
  return null;
}
