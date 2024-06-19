import * as React from 'react';
import path from 'node:path';
import { createBreakpoints } from '@mui/system';
import { createRenderer } from '@mui/internal-test-utils';
import { runTransformation, expect } from '../testUtils';
import GridOutput from './fixtures/Grid.output';

describe('Pigment CSS - Grid', () => {
  const { render } = createRenderer();

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

  it('should render the basic example', () => {
    const { getByTestId } = render(
      <GridOutput container spacing={2} columns={16} data-testid="grid-container">
        <GridOutput size={8} offset={2} data-testid="grid-item">
          <span>size=8</span>
        </GridOutput>
      </GridOutput>,
    );

    expect(getByTestId('grid-container')).not.to.equal(null);
    expect(getByTestId('grid-item')).not.to.equal(null);
  });
});
