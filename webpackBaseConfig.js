const path = require('path');

// WARNING: Use this module only as an inspiration.
// Cherry-pick the parts you need and inline them in the webpack.config you need.
// This module isn't used to build the documentation. We use Next.js for that.
// This module is used by the visual regression tests to run the demos and by eslint-plugin-import.
module.exports = {
  context: path.resolve(__dirname),
  resolve: {
    modules: [__dirname, 'node_modules'],
    alias: {
      '@pigment-css/theme': path.resolve(__dirname, './packages/pigment-css-theme/src'),
      '@pigment-css/utils': path.resolve(__dirname, './packages/pigment-css-utils/src'),
      '@pigment-css/react': path.resolve(__dirname, './packages/pigment-css-react/src'),
      docs: path.resolve(__dirname, './docs'),
      '@mui-internal/api-docs-builder': path.resolve(
        __dirname,
        './node_modules/@mui/monorepo/packages/api-docs-builder',
      ),
    },
    extensions: ['.js', '.ts', '.tsx', '.d.ts'],
  },
};
