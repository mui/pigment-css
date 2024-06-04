import { expect } from 'chai';
import { atomics } from '../src/generateAtomics';

const atomic = atomics({
  styles: {
    display: {
      flex: {
        xs: 'display-flex-xs',
        $$default: 'display-flex-xs',
        sm: 'display-flex-sm',
        md: 'display-flex-md',
        lg: 'display-flex-lg',
        xl: 'display-flex-xl',
      },
      'inline-flex': {
        xs: 'display-inline-flex-xs',
        $$default: 'display-inline-flex-xs',
        sm: 'display-inline-flex-sm',
        md: 'display-inline-flex-md',
        lg: 'display-inline-flex-lg',
        xl: 'display-inline-flex-xl',
      },
    },
    flexDirection: {
      column: {
        xs: 'flex-direction-column-xs',
        $$default: 'flex-direction-column-xs',
        sm: 'flex-direction-column-sm',
        md: 'flex-direction-column-md',
        lg: 'flex-direction-column-lg',
        xl: 'flex-direction-column-xl',
      },
      'column-reverse': {
        xs: 'flex-direction-column-reverse-xs',
        $$default: 'flex-direction-column-reverse-xs',
        sm: 'flex-direction-column-reverse-sm',
        md: 'flex-direction-column-reverse-md',
        lg: 'flex-direction-column-reverse-lg',
        xl: 'flex-direction-column-reverse-xl',
      },
      row: {
        xs: 'flex-direction-row-xs',
        $$default: 'flex-direction-row-xs',
        sm: 'flex-direction-row-sm',
        md: 'flex-direction-row-md',
        lg: 'flex-direction-row-lg',
        xl: 'flex-direction-row-xl',
      },
      'row-reverse': {
        xs: 'flex-direction-row-reverse-xs',
        $$default: 'flex-direction-row-reverse-xs',
        sm: 'flex-direction-row-reverse-sm',
        md: 'flex-direction-row-reverse-md',
        lg: 'flex-direction-row-reverse-lg',
        xl: 'flex-direction-row-reverse-xl',
      },
    },
    justifyContent: {
      end: {
        xs: 'justify-content-end-xs',
        $$default: 'justify-content-end-xs',
        sm: 'justify-content-end-sm',
        md: 'justify-content-end-md',
        lg: 'justify-content-end-lg',
        xl: 'justify-content-end-xl',
      },
      start: {
        xs: 'justify-content-start-xs',
        $$default: 'justify-content-start-xs',
        sm: 'justify-content-start-sm',
        md: 'justify-content-start-md',
        lg: 'justify-content-start-lg',
        xl: 'justify-content-start-xl',
      },
      'flex-end': {
        xs: 'justify-content-flex-end-xs',
        $$default: 'justify-content-flex-end-xs',
        sm: 'justify-content-flex-end-sm',
        md: 'justify-content-flex-end-md',
        lg: 'justify-content-flex-end-lg',
        xl: 'justify-content-flex-end-xl',
      },
      'flex-start': {
        xs: 'justify-content-flex-start-xs',
        $$default: 'justify-content-flex-start-xs',
        sm: 'justify-content-flex-start-sm',
        md: 'justify-content-flex-start-md',
        lg: 'justify-content-flex-start-lg',
        xl: 'justify-content-flex-start-xl',
      },
      center: {
        xs: 'justify-content-center-xs',
        $$default: 'justify-content-center-xs',
        sm: 'justify-content-center-sm',
        md: 'justify-content-center-md',
        lg: 'justify-content-center-lg',
        xl: 'justify-content-center-xl',
      },
      'space-between': {
        xs: 'justify-content-space-between-xs',
        $$default: 'justify-content-space-between-xs',
        sm: 'justify-content-space-between-sm',
        md: 'justify-content-space-between-md',
        lg: 'justify-content-space-between-lg',
        xl: 'justify-content-space-between-xl',
      },
      'space-around': {
        xs: 'justify-content-space-around-xs',
        $$default: 'justify-content-space-around-xs',
        sm: 'justify-content-space-around-sm',
        md: 'justify-content-space-around-md',
        lg: 'justify-content-space-around-lg',
        xl: 'justify-content-space-around-xl',
      },
      'space-evenly': {
        xs: 'justify-content-space-evenly-xs',
        $$default: 'justify-content-space-evenly-xs',
        sm: 'justify-content-space-evenly-sm',
        md: 'justify-content-space-evenly-md',
        lg: 'justify-content-space-evenly-lg',
        xl: 'justify-content-space-evenly-xl',
      },
    },
    alignItems: {
      center: {
        xs: 'align-items-center-xs',
        $$default: 'align-items-center-xs',
        sm: 'align-items-center-sm',
        md: 'align-items-center-md',
        lg: 'align-items-center-lg',
        xl: 'align-items-center-xl',
      },
      end: {
        xs: 'justify-content-end-xs',
        $$default: 'justify-content-end-xs',
        sm: 'justify-content-end-sm',
        md: 'justify-content-end-md',
        lg: 'justify-content-end-lg',
        xl: 'justify-content-end-xl',
      },
      'flex-end': {
        xs: 'justify-content-flex-end-xs',
        $$default: 'justify-content-flex-end-xs',
        sm: 'justify-content-flex-end-sm',
        md: 'justify-content-flex-end-md',
        lg: 'justify-content-flex-end-lg',
        xl: 'justify-content-flex-end-xl',
      },
      'flex-start': {
        xs: 'justify-content-flex-start-xs',
        $$default: 'justify-content-flex-start-xs',
        sm: 'justify-content-flex-start-sm',
        md: 'justify-content-flex-start-md',
        lg: 'justify-content-flex-start-lg',
        xl: 'justify-content-flex-start-xl',
      },
      'self-end': {
        xs: 'justify-content-self-end-xs',
        $$default: 'justify-content-self-end-xs',
        sm: 'justify-content-self-end-sm',
        md: 'justify-content-self-end-md',
        lg: 'justify-content-self-end-lg',
        xl: 'justify-content-self-end-xl',
      },
      'self-start': {
        xs: 'justify-content-self-start-xs',
        $$default: 'justify-content-self-start-xs',
        sm: 'justify-content-self-start-sm',
        md: 'justify-content-self-start-md',
        lg: 'justify-content-self-start-lg',
        xl: 'justify-content-self-start-xl',
      },
      start: {
        xs: 'justify-content-start-xs',
        $$default: 'justify-content-start-xs',
        sm: 'justify-content-start-sm',
        md: 'justify-content-start-md',
        lg: 'justify-content-start-lg',
        xl: 'justify-content-start-xl',
      },
      baseline: {
        xs: 'justify-content-baseline-xs',
        $$default: 'justify-content-baseline-xs',
        sm: 'justify-content-baseline-sm',
        md: 'justify-content-baseline-md',
        lg: 'justify-content-baseline-lg',
        xl: 'justify-content-baseline-xl',
      },
      normal: {
        xs: 'justify-content-normal-xs',
        $$default: 'justify-content-normal-xs',
        sm: 'justify-content-normal-sm',
        md: 'justify-content-normal-md',
        lg: 'justify-content-normal-lg',
        xl: 'justify-content-normal-xl',
      },
      stretch: {
        xs: 'justify-content-stretch-xs',
        $$default: 'justify-content-stretch-xs',
        sm: 'justify-content-stretch-sm',
        md: 'justify-content-stretch-md',
        lg: 'justify-content-stretch-lg',
        xl: 'justify-content-stretch-xl',
      },
    },
    gap: {
      '--Stack-gap': {
        xs: 'gap--Stack-gap-xs',
        $$default: 'gap--Stack-gap-xs',
        sm: 'gap--Stack-gap-sm',
        md: 'gap--Stack-gap-md',
        lg: 'gap--Stack-gap-lg',
        xl: 'gap--Stack-gap-xl',
      },
    },
  },
  shorthands: { direction: ['flexDirection'], spacing: ['gap'] },
  // @ts-ignore This is not expected while calling the pre-transpiled generateAtomics
  conditions: ['xs', 'sm', 'md', 'lg', 'xl'],
  defaultCondition: 'xs',
  unitless: [],
  multiplier: 8,
});

describe('generateAtomics', () => {
  it('should generate the correct class string and style object from the given atomic class mapping', () => {
    expect(
      atomic({
        gap: {
          lg: 1,
          xs: 2,
        },
        display: 'flex',
      }),
    ).to.deep.equal({
      className: 'gap--Stack-gap-lg gap--Stack-gap-xs display-flex-xs',
      style: {
        '--Stack-gap_lg': '8px',
        '--Stack-gap_xs': '16px',
      },
    });
    expect(
      atomic({
        display: ['flex', 'inline-flex'],
      }),
    ).to.deep.equal({
      className: 'display-flex-xs display-inline-flex-sm',
      style: {},
    });
  });

  it('should work with shorthands', () => {
    expect(
      atomic({
        direction: ['row', 'column'],
        gap: [1, 2],
      }),
    ).to.deep.equal({
      className:
        'flex-direction-row-xs flex-direction-column-sm gap--Stack-gap-xs gap--Stack-gap-sm',
      style: {
        '--Stack-gap_sm': '16px',
        '--Stack-gap_xs': '8px',
      },
    });
  });
});
