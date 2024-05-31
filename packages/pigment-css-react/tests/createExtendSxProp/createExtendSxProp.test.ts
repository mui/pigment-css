import path from 'node:path';
import { expect } from 'chai';
import { createExtendSxProp } from '@pigment-css/react';
import { runTransformation } from '../testUtils';

describe('Pigment CSS - createExtendSxProp', () => {
  it('replaced correctly', async () => {
    const { output, fixture } = await runTransformation(
      path.join(__dirname, 'fixtures/extendSxProp.input.js'),
    );

    expect(output.js).to.equal(fixture.js);
    expect(output.css).to.equal(fixture.css);
  });

  it('return the new copy of input', () => {
    const original = { color: 'red' };
    expect(createExtendSxProp()(original)).to.not.equal(original);
    expect(createExtendSxProp()(original)).to.deep.equal({ color: 'red' });
  });
});
