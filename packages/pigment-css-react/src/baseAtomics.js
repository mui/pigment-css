import { generateAtomics } from './generateAtomics';

export const stackAtomics = generateAtomics(({ theme }) => ({
  conditions: Object.keys(theme.breakpoints.values).reduce((acc, breakpoint) => {
    acc[breakpoint] = `@media (min-width: ${theme.breakpoints.values[breakpoint]}${
      theme.breakpoints.unit ?? 'px'
    })`;
    return acc;
  }, {}),
  defaultCondition: theme.breakpoints?.keys?.[0] ?? 'xs',
  properties: {
    display: ['flex', 'inline-flex'],
    flexDirection: ['column', 'column-reverse', 'row', 'row-reverse'],
    justifyContent: [
      'end',
      'start',
      'flex-end',
      'flex-start',
      'center',
      'space-between',
      'space-around',
      'space-evenly',
    ],
    alignItems: [
      'center',
      'end',
      'flex-end',
      'flex-start',
      'self-end',
      'self-start',
      'start',
      'baseline',
      'normal',
      'stretch',
    ],
    gap: ['--Stack-gap'],
  },
  shorthands: {
    direction: ['flexDirection'],
    spacing: ['gap'],
  },
  multipliers: {
    gap: 8,
  },
}));

export const gridAtomics = generateAtomics(({ theme }) => ({
  conditions: Object.keys(theme.breakpoints.values).reduce((acc, breakpoint) => {
    acc[breakpoint] = `@media (min-width: ${theme.breakpoints.values[breakpoint]}${
      theme.breakpoints.unit ?? 'px'
    })`;
    return acc;
  }, {}),
  defaultCondition: theme.breakpoints?.keys?.[0] ?? 'xs',
  properties: {
    flexDirection: ['column', 'column-reverse', 'row', 'row-reverse'],
    '--Grid-parent-column-count': ['--Grid-parent-column-count'],
    '--Grid-parent-column-spacing': ['--Grid-parent-column-spacing'],
    '--Grid-parent-row-spacing': ['--Grid-parent-row-spacing'],
    '--Grid-self-column-span': ['--Grid-self-column-span'],
    '--Grid-self-width': ['--Grid-self-width'],
    '--Grid-self-max-width': ['--Grid-self-max-width'],
    '--Grid-self-flex': ['--Grid-self-flex'],
    '--Grid-self-column-spacing': ['--Grid-self-column-spacing'],
    '--Grid-self-row-spacing': ['--Grid-self-row-spacing'],
    '--Grid-self-offset': ['--Grid-self-offset'],
    '--Grid-self-margin-left': ['--Grid-self-margin-left'],
  },
  shorthands: {
    direction: ['flexDirection'],
  },
  unitless: ['--Grid-parent-column-count', '--Grid-self-column-span', '--Grid-self-offset'],
  multipliers: {
    '--Grid-parent-column-spacing': Array.isArray(theme.vars?.spacing) ? theme.vars.spacing[0] : theme.vars?.spacing,
    '--Grid-parent-row-spacing': Array.isArray(theme.vars?.spacing) ? theme.vars.spacing[0] : theme.vars?.spacing,
    '--Grid-self-column-spacing': Array.isArray(theme.vars?.spacing) ? theme.vars.spacing[0] : theme.vars?.spacing,
    '--Grid-self-row-spacing': Array.isArray(theme.vars?.spacing) ? theme.vars.spacing[0] : theme.vars?.spacing,
  },
  inlineGetters: {
    '--Grid-self-width': (value) => {
      if (value === 'grow') {
        return 'unset';
      }

      if (value === 'auto') {
        return 'auto';
      }

      return 'calc(100% * var(--Grid-self-column-span) / var(--Grid-parent-column-count) - (var(--Grid-parent-column-count) - var(--Grid-self-column-span)) * var(--Grid-parent-column-spacing) / var(--Grid-parent-column-count))';
    },
    '--Grid-self-max-width': (value) => {
      if (value === 'grow') {
        return '100%';
      }

      if (value === 'auto') {
        return 'none';
      }

      return 'unset';
    },
    '--Grid-self-flex': (value) => {
      if (value === 'grow') {
        return '1 1 0';
      }

      if (value === 'auto') {
        return '0 0 auto';
      }

      return '0 1 auto';
    },
    '--Grid-self-margin-left': (value) => {
      if (value === 'auto') {
        return 'auto';
      }

      return 'calc(100% * var(--Grid-self-offset) / var(--Grid-parent-column-count) + var(--Grid-parent-column-spacing) * var(--Grid-self-offset) / var(--Grid-parent-column-count))';
    },
  },
}));
