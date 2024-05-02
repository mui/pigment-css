import { declare } from '@babel/helper-plugin-utils';

export const replaceZeroStyledPlugin = declare<{}>((api) => {
  api.assertVersion(7);
  return {
    name: '@pigmentcss/wyw-replace-zero-styled-plugin',
    visitor: {
      ImportDeclaration(path) {
        const sourcePath = path.get('source');
        if (sourcePath.node.value.endsWith('zero-styled')) {
          sourcePath.replaceWith(api.types.stringLiteral('@pigment-css/react'));
        }
      },
    },
  };
});
