import path from 'node:path';
import { runTransformation, expect } from '../testUtils';

describe('Pigment CSS - globalCss', () => {
  it('basics', async () => {
    const { output, fixture } = await runTransformation(
      path.join(__dirname, 'fixtures/globalCss.input.js'),
    );

    expect(output.js).to.equal(fixture.js);
    expect(output.css).to.equal(fixture.css);
  });

  it('can access theme', async () => {
    const { output, fixture } = await runTransformation(
      path.join(__dirname, 'fixtures/globalCss-theme.input.js'),
      {
        themeArgs: {
          theme: {
            palette: {
              primary: {
                main: 'red',
              },
            },
          },
        },
      },
    );

    expect(output.js).to.equal(fixture.js);
    expect(output.css).to.equal(fixture.css);
  });
});
