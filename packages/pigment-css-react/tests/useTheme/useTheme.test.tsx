import path from 'node:path';
import { runTransformation, expect } from '../testUtils';

describe('Pigment CSS - useTheme', () => {
  it('should replace useTheme call with the theme import', async () => {
    const { output, fixture } = await runTransformation(
      path.join(__dirname, 'fixtures/useTheme.input.js'),
    );

    expect(output.js).to.equal(fixture.js);
    expect(output.css).to.equal(fixture.css);
  });
});
