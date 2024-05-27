import type { Theme } from './extendTheme';
import { generateThemeTokens } from './generateCss';

export function generateThemeSource(theme: Theme | undefined) {
  if (!theme) {
    return `export default {}`;
  }
  const hasBreakpoints = !!theme.unstable_args?.breakpoints;
  const hasTransitions = !!theme.unstable_args?.transitions;
  const breakpointsImport = hasBreakpoints
    ? "import createBreakpoints from '@mui/system/createTheme/createBreakpoints';\n"
    : '';
  const transitionsImport = hasTransitions
    ? `import createTransitions from '${process.env.PACKAGE_NAME}/createTransitions';\n`
    : '';
  const source = `${breakpointsImport}${transitionsImport}
const theme = ${JSON.stringify(generateThemeTokens(theme))};
${hasBreakpoints ? `theme.breakpoints = createBreakpoints(${JSON.stringify(theme.unstable_args.breakpoints)});\n` : ''}
${hasTransitions ? `theme.transitions = createTransitions(${JSON.stringify(theme.unstable_args.transitions)});\n` : ''}
export default theme;
`;

  return source;
}
