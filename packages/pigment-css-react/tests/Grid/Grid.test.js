import path from 'node:path';
import { createBreakpoints } from '@mui/system';
import { runTransformation, expect } from '../testUtils';

describe('Pigment CSS - Grid', () => {
  it('should transform and render sx prop', async () => {
    const { output, fixture } = await runTransformation(
      path.join(__dirname, '../../src/Grid.jsx'),
      {
        themeArgs: {
          theme: {
            breakpoints: createBreakpoints({}),
          },
        },
        outputDir: path.join(__dirname, 'fixtures'),
      },
    );
    expect(output.js).to.equal(fixture.js);
    expect(output.css).to.equal(fixture.css);
  });
});
