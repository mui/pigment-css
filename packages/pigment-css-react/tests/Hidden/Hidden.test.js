import * as React from 'react';
import path from 'node:path';
import { createRenderer } from '@mui/internal-test-utils';
import { createBreakpoints } from '@mui/system';
import { runTransformation, expect } from '../testUtils';

describe('Pigment CSS - Hidden', () => {
  const { render } = createRenderer();

  it('should transform and render sx prop', async () => {
    const { output, fixture } = await runTransformation(
      path.join(__dirname, '../../src/Hidden.jsx'),
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

    const HiddenOutput = (await import('./fixtures/Hidden.output')).default;

    const { container } = render(<HiddenOutput smDown lgUp only={['xs', 'xl']} />);
    const classNames = new Set([...container.firstChild.className.split(' ')]);

    expect(classNames.size).to.equal(4);
  });
});
