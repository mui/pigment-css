import path from 'node:path';
import { runTransformation, expect } from '../testUtils';

describe('Pigment CSS - styled', () => {
  it('basics', async () => {
    const { output, fixture } = await runTransformation(
      path.join(__dirname, 'fixtures/styled.input.js'),
    );

    expect(output.js).to.equal(fixture.js);
    expect(output.css).to.equal(fixture.css);
  });

  it('should replace the import paths to the ones specified in config', async () => {
    const { output, fixture } = await runTransformation(
      path.join(__dirname, 'fixtures/styled-import-replacement.input.js'),
      {
        runtimeReplacementPath(tag) {
          if (tag === 'styled') {
            return `@my-lib/react/styled`;
          }
          return null;
        },
      },
    );

    expect(output.js).to.equal(fixture.js);
    expect(output.css).to.equal(fixture.css);
  });

  it('should not use css layers if the feature is disabled', async () => {
    const { output, fixture } = await runTransformation(
      path.join(__dirname, 'fixtures/styled-no-layer.input.js'),
      {
        features: {
          useLayer: false,
        },
      },
    );

    expect(output.js).to.equal(fixture.js);
    expect(output.css).to.equal(fixture.css);
  });
});
