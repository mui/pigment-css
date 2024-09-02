/*
 * Replicates `@mui/styled-engine` internals for the plugins to swap the runtime.
 */

export default {
  __esModule: true,
  default: () => () => () => null,
  internal_mutateStyles: () => {},
  internal_processStyles: () => {},
  internal_serializeStyles: (x: any) => x,
  keyframes: () => '',
  css: () => '',
};
