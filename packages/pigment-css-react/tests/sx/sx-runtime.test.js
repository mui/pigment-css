import { expect } from 'chai';
import sx from '../../src/sx';

describe('Pigment CSS - sx runtime', () => {
  it('merge className and style', () => {
    expect(sx('foo', { className: 'bar', style: { color: 'red' } })).to.deep.equal({
      className: 'foo bar',
      style: { color: 'red' },
    });
  });

  it('merge vars', () => {
    expect(
      sx(
        { className: 'foo', vars: { foo: ['foo'] } },
        { className: 'bar', style: { color: 'red' } },
      ),
    ).to.deep.equal({
      className: 'foo bar',
      style: { '--foo': 'foo', color: 'red' },
    });
  });

  it('support array', () => {
    const disabled = false;
    const color = 'secondary';
    expect(
      sx(
        [
          'foo',
          disabled
            ? { className: 'bar', vars: { bar: ['bar', false] } }
            : { className: 'baz', vars: { baz: ['baz', false] } },
          color === 'primary' && 'red',
        ],
        {
          className: 'root',
          style: { color: 'blue' },
        },
      ),
    ).to.deep.equal({
      className: 'foo baz root',
      style: {
        color: 'blue',
        '--baz': 'baz',
      },
    });
  });
});
