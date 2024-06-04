import { expect } from 'chai';
import { generateThemeSource } from '../../src/utils';

describe('Pigment CSS - generateThemeSource', () => {
  it('should export empty theme if theme is undefined', () => {
    expect(generateThemeSource()).to.equal(`export default {}`);
  });

  it('should generate basic theme code with theme json', () => {
    const result = generateThemeSource({
      vars: {
        palette: {
          primary: {
            main: 'red',
            secondary: 'blue',
          },
        },
      },
    });

    expect(result).to.equal(
      `export default {"vars":{"palette":{"primary":{"main":"red","secondary":"blue"}}}};`,
    );
  });

  it('should generate theme from toRuntimeSource method if present', () => {
    const result = generateThemeSource({
      vars: {
        palette: {
          primary: {
            main: 'red',
            secondary: 'blue',
          },
        },
      },
      toRuntimeSource(theme: any) {
        return `const theme = ${JSON.stringify(theme)};export default theme;`;
      },
    });

    expect(result).to.equal(
      `const theme = {"vars":{"palette":{"primary":{"main":"red","secondary":"blue"}}}};export default theme;`,
    );
  });
});
