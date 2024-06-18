import path from 'node:path';
import { createBreakpoints } from '@mui/system';
import { runTransformation, expect } from '../testUtils';

const theme = {
  palette: {
    primary: {
      main: 'red',
    },
    secondary: {
      main: 'blue',
    },
  },
  size: {
    font: {
      h1: '3rem',
    },
  },
  applyStyles(mode: string, style: object) {
    return {
      [`@media (prefers-color-scheme: ${mode})`]: style,
    };
  },
  breakpoints: createBreakpoints({}),
  spacing(val: string | number) {
    if (typeof val === 'string') {
      return val;
    }
    return `${val * 8}px`;
  },
};

describe('Container', () => {
  it('should transform Container component with appropriate theme', async () => {
    const { output, fixture } = await runTransformation(
      path.join(__dirname, '../../src/Container.jsx'),
      {
        themeArgs: {
          theme,
        },
        outputDir: path.join(__dirname, 'fixtures'),
      },
    );

    expect(output.js).to.equal(fixture.js);
    expect(output.css).to.equal(fixture.css);
  });
});
