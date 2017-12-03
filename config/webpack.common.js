const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const rootPath = path.resolve(__dirname, '../');

module.exports = {
  // Make the configuration independent of current working directory
  context: rootPath,

  entry: './src/index.tsx',

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
            options: { sourceMap: true }
          }, {
            loader: 'css-loader',
            options: {
              camelCase: 'dashesOnly',
              localIdentName: '[name]__[local]--[hash:base64:5]',
              modules: true,
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader',
        options: {
          // Don't pollute Webpack stats JSON output
          silent: process.argv.indexOf('--json') !== -1
        }
      }
    ]
  },

  output: {
    filename: '[name].bundle.js'
  },

  plugins: [
    // Creates index.html
    new HtmlWebpackPlugin({
      favicon: './src/favicon.ico',
      title: 'React Starter'
    })
  ],

  resolve: {
    // Overrides default. js is required for Webpack plugins
    extensions: ['.js', '.ts', '.tsx'],

    // Allow imports without relative path hell
    modules: [
      path.resolve(rootPath, 'src'),
      'node_modules'
    ]
  }
};
