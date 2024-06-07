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
    display: ['flex', 'inline-flex'],
    flexDirection: ['column', 'column-reverse', 'row', 'row-reverse'],
    flexWrap: ['wrap', 'nowrap', 'wrap-reverse'],
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
    '--Column-count': ['--Column-count'],
    '--Column-span': ['--Column-span'],
    '--Column-gap': ['--Column-gap'],
    '--Row-gap': ['--Row-gap'],
    '--Item-offset': ['--Item-offset']
  },
  shorthands: {
    direction: ['flexDirection'],
  },
  unitless: ['--Column-count', '--Column-span', '--Item-offset'],
  multipliers: {
    '--Column-gap': 8,
    '--Row-gap': 8,
  },
}));
