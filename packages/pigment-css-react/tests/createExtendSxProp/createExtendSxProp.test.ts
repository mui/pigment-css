import path from 'node:path';
import { expect } from 'chai';
import { runTransformation } from '../testUtils';

describe('Pigment CSS - createExtendSxProp', () => {
  it('replaced correctly', async () => {
    const { output, fixture } = await runTransformation(
      path.join(__dirname, 'fixtures/extendSxProp.input.js'),
    );

    expect(output.js).to.equal(fixture.js);
    expect(output.css).to.equal(fixture.css);
  });
});
