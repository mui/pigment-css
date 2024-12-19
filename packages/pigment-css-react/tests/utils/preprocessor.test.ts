import { expect } from 'chai';
import { preprocessor } from '@pigment-css/react/utils';

describe('preprocessor', () => {
  it('should preprocess selector and css by default to ltr', () => {
    const res = preprocessor('.hello', 'padding-left: 10px; transform: translate(10px, 20px)');
    expect(res).to.equal('.hello{padding-left:10px;transform:translate(10px, 20px);}');
  });

  it('should preprocess selector and css to rtl when specified', () => {
    const res = preprocessor('.hello', 'padding-left: 10px; transform: translate(10px, 20px)', {
      defaultDirection: 'rtl',
      generateForBothDir: false,
    });
    expect(res).to.equal('.hello{padding-right:10px;transform:translate(-10px, 20px);}');
  });

  it('should generate both rtl and ltr css when "generateForBothDir" is true', () => {
    expect(
      preprocessor('.hello', 'padding-left: 10px; transform: translate(10px, 20px)', {
        defaultDirection: 'ltr',
        generateForBothDir: true,
      }),
    ).to.equal(
      '.hello{padding-left:10px;transform:translate(10px, 20px);}[dir=rtl] .hello{padding-right:10px;transform:translate(-10px, 20px);}',
    );

    expect(
      preprocessor('.hello', 'padding-right: 10px; transform: translate(-10px, 20px)', {
        defaultDirection: 'rtl',
        generateForBothDir: true,
      }),
    ).to.equal(
      '.hello{padding-left:10px;transform:translate(10px, 20px);}[dir=ltr] .hello{padding-right:10px;transform:translate(-10px, 20px);}',
    );
  });
});
