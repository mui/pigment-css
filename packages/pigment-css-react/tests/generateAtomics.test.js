import { expect } from 'chai';
import { atomics } from '../src/generateAtomics';

const atomic = atomics({
  styles: {
    flexDirection: {
      column: {
        xs: 'flex-direction-column-xs',
        sm: 'flex-direction-column-sm',
        md: 'flex-direction-column-md',
        lg: 'flex-direction-column-lg',
        xl: 'flex-direction-column-xl',
      },
      'column-reverse': {
        xs: 'flex-direction-column-reverse-xs',
        sm: 'flex-direction-column-reverse-sm',
        md: 'flex-direction-column-reverse-md',
        lg: 'flex-direction-column-reverse-lg',
        xl: 'flex-direction-column-reverse-xl',
      },
      row: {
        xs: 'flex-direction-row-xs',
        sm: 'flex-direction-row-sm',
        md: 'flex-direction-row-md',
        lg: 'flex-direction-row-lg',
        xl: 'flex-direction-row-xl',
      },
      'row-reverse': {
        xs: 'flex-direction-row-reverse-xs',
        sm: 'flex-direction-row-reverse-sm',
        md: 'flex-direction-row-reverse-md',
        lg: 'flex-direction-row-reverse-lg',
        xl: 'flex-direction-row-reverse-xl',
      },
    },
    gap: {
      '--Stack-gap': {
        xs: 'gap--Stack-gap-xs',
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
  multipliers: {
    gap: '8px',
  },
});

describe('generateAtomics', () => {
  it('should generate the correct class string and style object from the given atomic class mapping', () => {
    expect(
      atomic({
        gap: {
          lg: 1,
          xs: 2,
        },
      }),
    ).to.deep.equal({
      className: 'gap--Stack-gap-lg gap--Stack-gap-xs',
      style: {
        '--Stack-gap-xs': 'calc(2 * 8px)',
        '--Stack-gap-lg': 'calc(1 * 8px)',
      },
    });
  });

  it('should work with shorthands with primitives values', () => {
    expect(
      atomic({
        direction: 'row',
        spacing: 1,
      }),
    ).to.deep.equal({
      className: 'flex-direction-row-xs gap--Stack-gap-xs',
      style: {
        '--Stack-gap-xs': 'calc(1 * 8px)',
      },
    });
  });

  it('should not throw with undefined or null', () => {
    expect(
      atomic({
        direction: undefined,
        spacing: null,
      }),
    ).to.deep.equal({
      className: '',
      style: {},
    });
  });

  it('should work with shorthands with object as values', () => {
    expect(
      atomic({
        direction: { xs: 'row', sm: 'column' },
        gap: { xs: 1, sm: 2 },
      }),
    ).to.deep.equal({
      className:
        'flex-direction-row-xs flex-direction-column-sm gap--Stack-gap-xs gap--Stack-gap-sm',
      style: {
        '--Stack-gap-xs': 'calc(1 * 8px)',
        '--Stack-gap-sm': 'calc(2 * 8px)',
      },
    });
  });

  it('should not throw with shorthands with object as values', () => {
    expect(
      atomic({
        direction: { xs: null, sm: undefined },
        gap: { xs: null, sm: undefined },
      }),
    ).to.deep.equal({
      className: '',
      style: {},
    });
  });

  it('should work with shorthands with array as values', () => {
    expect(
      atomic({
        direction: ['row', 'column'],
        gap: [1, 2],
      }),
    ).to.deep.equal({
      className:
        'flex-direction-row-xs flex-direction-column-sm gap--Stack-gap-xs gap--Stack-gap-sm',
      style: {
        '--Stack-gap-xs': 'calc(1 * 8px)',
        '--Stack-gap-sm': 'calc(2 * 8px)',
      },
    });
  });

  it('should not throw with shorthands with array as values', () => {
    expect(
      atomic({
        direction: [null, undefined],
        gap: [undefined, null],
      }),
    ).to.deep.equal({
      className: '',
      style: {},
    });
  });

  describe('hidden atomics', () => {
    const hiddenAtomic = atomics({
      styles: {
        display: {
          none: {
            xsUp: 'display-none-xsUp',
            xsDown: 'display-none-xsDown',
            smUp: 'display-none-smUp',
            smDown: 'display-none-smDown',
            mdUp: 'display-none-mdUp',
            mdDown: 'display-none-mdDown',
            lgUp: 'display-none-lgUp',
            lgDown: 'display-none-lgDown',
            xlUp: 'display-none-xlUp',
            xlDown: 'display-none-xlDown',
            xsOnly: 'display-none-onlyXs',
            smOnly: 'display-none-onlySm',
            mdOnly: 'display-none-onlyMd',
            lgOnly: 'display-none-onlyLg',
            xlOnly: 'display-none-onlyXl',
          },
        },
      },
      conditions: [
        'xsUp',
        'xsDown',
        'smUp',
        'smDown',
        'mdUp',
        'mdDown',
        'lgUp',
        'lgDown',
        'xlUp',
        'xlDown',
        'xsOnly',
        'smOnly',
        'mdOnly',
        'lgOnly',
        'xlOnly',
      ],
    });

    it('should generate up and down classes', () => {
      expect(
        hiddenAtomic({
          display: {
            smDown: 'none',
            lgUp: 'none',
          },
        }),
      ).to.deep.equal({
        className: 'display-none-smDown display-none-lgUp',
        style: {},
      });
    });

    it('should work with only sm', () => {
      expect(
        hiddenAtomic({
          display: {
            smOnly: 'none',
          },
        }),
      ).to.deep.equal({
        className: 'display-none-onlySm',
        style: {},
      });
    });

    it('should work with only with array value', () => {
      expect(
        hiddenAtomic({
          display: {
            smOnly: 'none',
            lgOnly: 'none',
          },
        }),
      ).to.deep.equal({
        className: 'display-none-onlySm display-none-onlyLg',
        style: {},
      });
    });
  });
});
