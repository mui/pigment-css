import { generateAtomics } from './generateAtomics';

export const stackAtomics = generateAtomics(({ theme }) => ({
  conditions: Object.keys(theme.breakpoints.values).reduce((acc, breakpoint) => {
    acc[breakpoint] = `@media (min-width: ${theme.breakpoints.values[breakpoint]}${
      theme.breakpoints.unit ?? 'px'
    })`;
    return acc;
  }, {}),
  defaultCondition: theme.defaultBreakpoint ?? 'xs',
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
  multiplier: 8,
}));
