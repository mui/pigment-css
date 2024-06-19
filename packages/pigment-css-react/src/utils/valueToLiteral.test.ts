import { expect } from 'chai';
import { valueToLiteral } from './valueToLiteral';

describe('valueToLiteral', () => {
  it('should work with undefined as a value', () => {
    expect(
      valueToLiteral({
        foo: undefined,
      }),
    ).to.deep.equal({
      type: 'ObjectExpression',
      properties: [
        {
          type: 'ObjectProperty',
          computed: false,
          shorthand: false,
          key: {
            type: 'Identifier',
            name: 'foo',
          },
          value: {
            type: 'Identifier',
            name: 'undefined',
          },
        },
      ],
    });
  });

  it('should work with null as a value', () => {
    expect(
      valueToLiteral({
        foo: null,
      }),
    ).to.deep.equal({
      type: 'ObjectExpression',
      properties: [
        {
          type: 'ObjectProperty',
          computed: false,
          shorthand: false,
          key: {
            type: 'Identifier',
            name: 'foo',
          },
          value: {
            type: 'NullLiteral',
          },
        },
      ],
    });
  });
});
