import { serializeStyles } from '@emotion/serialize';
import { Theme } from './extendTheme';
import { PluginCustomOptions } from './cssFnValueToVariable';

export function generateTokenCss(
  theme?: Theme,
  experiments: PluginCustomOptions['experiments'] = {},
) {
  if (!theme) {
    return '';
  }
  // use emotion to serialize the object to css string
  const { styles } = serializeStyles(theme.generateStyleSheets?.() || []);
  return experiments.styleLayers ? `@layer pigment-base, pigment-variant;\n${styles}` : styles;
}

export function generateThemeTokens(theme?: Theme) {
  if (!theme || typeof theme !== 'object') {
    return {};
  }
  // is created using extendTheme
  if ('vars' in theme && theme.vars) {
    return {
      vars: theme.vars,
    };
  }
  return {};
}
