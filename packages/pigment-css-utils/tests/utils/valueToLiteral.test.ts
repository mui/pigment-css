import { expect } from 'chai';
import { valueToLiteral } from '../../src/utils/valueToLiteral';

describe('valueToLiteral', () => {
  it('should convert JS objects to their babel ast equivalent', () => {
    expect(valueToLiteral(undefined)).to.deep.equal({
      type: 'Identifier',
      name: 'undefined',
    });

    expect(
      valueToLiteral({
        color: 'primary',
        size: 'large',
      }),
    ).to.deep.equal({
      type: 'ObjectExpression',
      properties: [
        {
          type: 'ObjectProperty',
          key: { type: 'Identifier', name: 'color' },
          value: { type: 'StringLiteral', value: 'primary' },
          computed: false,
          shorthand: false,
        },
        {
          type: 'ObjectProperty',
          key: { type: 'Identifier', name: 'size' },
          value: { type: 'StringLiteral', value: 'large' },
          computed: false,
          shorthand: false,
        },
      ],
    });

    expect(
      valueToLiteral({
        color: 'red',
        '@media(max-width: 1000px)': {
          color: 'orange',
        },
      }),
    ).to.deep.equal({
      type: 'ObjectExpression',
      properties: [
        {
          type: 'ObjectProperty',
          key: { type: 'Identifier', name: 'color' },
          value: { type: 'StringLiteral', value: 'red' },
          computed: false,
          shorthand: false,
        },
        {
          type: 'ObjectProperty',
          key: { type: 'StringLiteral', value: '@media(max-width: 1000px)' },
          value: {
            type: 'ObjectExpression',
            properties: [
              {
                type: 'ObjectProperty',
                key: { type: 'Identifier', name: 'color' },
                value: { type: 'StringLiteral', value: 'orange' },
                computed: false,
                shorthand: false,
              },
            ],
          },
          computed: false,
          shorthand: false,
        },
      ],
    });

    expect(
      valueToLiteral({
        color: 'red',
        borderRadius: [1, 2, 3],
      }),
    ).to.deep.equal({
      type: 'ObjectExpression',
      properties: [
        {
          type: 'ObjectProperty',
          key: { type: 'Identifier', name: 'color' },
          value: { type: 'StringLiteral', value: 'red' },
          computed: false,
          shorthand: false,
        },
        {
          type: 'ObjectProperty',
          key: { type: 'Identifier', name: 'borderRadius' },
          value: {
            type: 'ArrayExpression',
            elements: [
              { type: 'NumericLiteral', value: 1 },
              { type: 'NumericLiteral', value: 2 },
              { type: 'NumericLiteral', value: 3 },
            ],
          },
          computed: false,
          shorthand: false,
        },
      ],
    });
  });
});
