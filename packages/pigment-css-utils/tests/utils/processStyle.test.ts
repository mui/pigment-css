import { expect } from 'chai';
import { ClassNameOptions, processStyle, processStyleObjects } from '../../src/utils';

describe('processStyle', () => {
  describe('processStyle', () => {
    it('should transform css variables', () => {
      let count = 0;
      function getVariableName() {
        count += 1;
        return `var-${count}`;
      }
      const style = {
        $$hello: 'world',
        $hello1: 'world',
        '.cls1': {
          border: '1px solid $palette.primary.main $$hello',
          color: () => 'red',
          flexGrow: () => '1',
        },
      };
      const res = processStyle(style, {
        getVariableName,
      });
      expect(res).to.deep.equal({
        result: {
          '---hello': 'world',
          '--hello1': 'world',
          '.cls1': {
            border: '1px solid var(--palette-primary-main) var(---hello)',
            color: 'var(--var-1)',
            flexGrow: 'var(--var-2)',
          },
        },
        variables: {
          '--var-1': [style[`.cls1`].color, 0],
          '--var-2': [style[`.cls1`].flexGrow, 1],
        },
      });
    });
  });

  describe('processStyleObject', () => {
    it('should parse style object array arg and output css string and classnames', () => {
      const theme = {
        palette: {
          primary: {
            main: 'red',
          },
        },
      };
      let varCount = 0;
      const options = {
        getVariableName() {
          varCount += 1;
          return `var-${varCount}`;
        },
        getClassName(opts?: ClassNameOptions) {
          if (!opts) {
            return 'class';
          }
          if ('isCv' in opts && opts.isCv) {
            return `class-cv`;
          }
          if ('variantName' in opts) {
            return `class-${opts.variantName}-${opts.variantValue}`;
          }
          return 'class';
        },
      };
      const result = processStyleObjects(
        [
          {
            $$flex: '51',
            $$testVar: 'red',
            backgroundColor: '$$testVar',
            border: '1px solid $palette.primary.main',
            variants: {
              size: {
                small: {
                  $$flex: 52,
                  padding: 0,
                  margin: 0,
                  borderColor: theme.palette.primary.main,
                },
                medium: {
                  $$flex: 53,
                  padding: 5,
                },
                large: {
                  $$flex: 54,
                  padding: 10,
                },
              },
              color: {
                primary: {
                  $$flex: 55,
                  color: 'green',
                },
                secondary: {
                  $$flex: 56,
                  color: 'blue',
                },
              },
            },
            compoundVariants: [
              {
                size: 'small',
                color: 'primary',
                css: `borderRadius: '100%'`,
              },
            ],
          },
        ],
        options,
      );
      expect(result).to.deep.equal({
        base: [
          {
            className: 'class',
            cssText:
              '---flex:51;---testVar:red;background-color:var(---testVar);border:1px solid var(--palette-primary-main);',
            variables: {},
            serializables: {},
          },
        ],
        defaultVariants: {},
        variants: [
          {
            className: 'class-size-small',
            serializables: { size: 'small' },
            variables: {},
            cssText: '---flex:52;padding:0;margin:0;border-color:red;',
          },
          {
            className: 'class-size-medium',
            serializables: { size: 'medium' },
            variables: {},
            cssText: '---flex:53;padding:5px;',
          },
          {
            className: 'class-size-large',
            serializables: { size: 'large' },
            variables: {},
            cssText: '---flex:54;padding:10px;',
          },
          {
            className: 'class-color-primary',
            serializables: { color: 'primary' },
            variables: {},
            cssText: '---flex:55;color:green;',
          },
          {
            className: 'class-color-secondary',
            serializables: { color: 'secondary' },
            variables: {},
            cssText: '---flex:56;color:blue;',
          },
        ],
        compoundVariants: [
          {
            className: 'class-cv',
            cssText: "borderRadius: '100%'",
            variables: {},
            serializables: { size: 'small', color: 'primary' },
          },
        ],
      });
    });
  });
});
