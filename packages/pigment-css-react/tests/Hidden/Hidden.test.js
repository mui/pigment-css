import * as React from 'react';
import path from 'node:path';
import { createRenderer } from '@mui/internal-test-utils';
import { runTransformation, expect } from '../testUtils';
import createBreakpoints from './createBreakpoints';
import HiddenOutput from './Hidden.output';

describe('Pigment CSS - Hidden', () => {
  const { render } = createRenderer();

  it('should transform and render sx prop', async () => {
    const { output, fixture } = await runTransformation(
      path.join(process.cwd(), 'packages/pigment-css-react/src/Hidden.jsx'),
      {
        themeArgs: {
          theme: {
            breakpoints: createBreakpoints({}),
          },
        },
        outputFilePath: path.join(
          process.cwd(),
          'packages/pigment-css-react/tests/Hidden/Hidden.output.js',
        ),
      },
    );

    expect(output.js).to.equal(fixture.js);
    expect(output.css).to.equal(fixture.css);

    const { container } = render(<HiddenOutput smDown lgUp only={['xs', 'xl']} />);
    const classNames = new Set([...container.firstChild.className.split(' ')]);

    expect(classNames.size).to.equal(4);
  });
});
