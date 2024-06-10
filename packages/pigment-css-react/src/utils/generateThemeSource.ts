import type { Theme } from './extendTheme';
import { generateThemeTokens } from './generateCss';

export function generateThemeSource(theme?: Theme) {
  if (!theme) {
    return `export default {}`;
  }
  if (typeof theme.toRuntimeSource !== 'function') {
    return `export default ${JSON.stringify(generateThemeTokens(theme))};`;
  }
  return theme.toRuntimeSource.call(theme, theme);
}
