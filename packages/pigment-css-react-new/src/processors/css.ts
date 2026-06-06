import { CssProcessor } from '@pigment-css/core/processors/css';

export class StyledCssProcessor extends CssProcessor {
  basePath = `${process.env.PACKAGE_NAME}/runtime`;
}
