import { expect } from 'chai';

import { css } from '../../src/runtime';

describe('css - runtime', () => {
  it('should return base classes when there are no variants or runtime props', async () => {
    const cssFn = css({
      classes: 'hello world',
    });
    expect(cssFn()).to.equal('hello world');
    expect(cssFn({ color: 'primary' })).to.equal('hello world');
  });

  it('should return all classes that match the props', () => {
    const cssFn = css({
      classes: 'hello world',
      variants: [
        {
          props: { color: 'primary' },
          $$cls: 'c-primary',
        },
        {
          props: { color: 'secondary', size: 'medium' },
          $$cls: 'c-secondary-s-medium',
        },
      ],
    });
    expect(cssFn()).to.equal('hello world');
    expect(cssFn({ color: 'primary' })).to.equal('hello world c-primary');
    expect(cssFn({ color: 'secondary' })).to.equal('hello world');
    expect(cssFn({ color: 'secondary', size: 'medium' })).to.equal(
      'hello world c-secondary-s-medium',
    );
  });
});
