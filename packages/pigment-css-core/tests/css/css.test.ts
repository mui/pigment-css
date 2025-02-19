import path from 'node:path';
import { runTransformation, expect } from '../testUtils';

const theme = {
  palette: {
    primary: {
      main: 'red',
    },
  },
  size: {
    font: {
      h1: '3rem',
    },
  },
};

describe('Pigment CSS - css', () => {
  it('basics', async () => {
    const { output, fixture } = await runTransformation(
      path.join(__dirname, 'fixtures/css.input.js'),
      {
        themeArgs: {
          theme,
        },
      },
    );

    expect(output.js).to.equal(fixture.js);
    expect(output.css).to.equal(fixture.css);
  });

  it('should use the replacement import paths if provided', async () => {
    const { output, fixture } = await runTransformation(
      path.join(__dirname, 'fixtures/css-replacement-import.input.js'),
      {
        themeArgs: {
          theme,
        },
        runtimeReplacementPath(tag) {
          if (tag === 'css') {
            return '@my-lib/core/css';
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
      path.join(__dirname, 'fixtures/css-no-layers.input.js'),
      {
        themeArgs: {
          theme,
        },
        features: {
          useLayer: false,
        },
      },
    );
    expect(output.js).to.equal(fixture.js);
    expect(output.css).to.equal(fixture.css);
  });
});
