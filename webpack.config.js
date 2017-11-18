const path = require('path');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.tsx',

  module: {
    rules: [
      { test: /\.tsx$/, loader: 'awesome-typescript-loader' }
    ]
  },

  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },

  plugins: [
    // Cleans before building
    new CleanWebpackPlugin(['dist']),

    // Creates index.html
    new HtmlWebpackPlugin({
      favicon: './src/favicon.ico',
      title: 'React Starter'
    })
  ],

  resolve: {
    // Overrides default. js is required for Webpack plugins
    extensions: ['.js', '.tsx']
  }
};
