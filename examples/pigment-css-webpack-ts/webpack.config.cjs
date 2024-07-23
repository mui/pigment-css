const path = require('path');
const { webpack: PigmentPlugin, extendTheme } = require('@pigment-css/unplugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// To learn more about theming, visit https://github.com/mui/pigment-css/blob/master/README.md#theming
const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        background: '0 0% 100%',
        foreground: '240 10% 3.9%',
        primary: '240 5.9% 10%',
        border: '240 5.9% 90%',
      },
    },
    dark: {
      palette: {
        background: '240 10% 3.9%',
        foreground: '0 0% 80%',
        primary: '0 0% 98%',
        border: '240 3.7% 15.9%',
      },
    },
  },
});

module.exports = {
  entry: './src/main.tsx',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    chunkFormat: 'array-push',
  },
  plugins: [
    PigmentPlugin({
      theme,
    }),
    new HtmlWebpackPlugin({ template: './index.html' }),
  ],
};
