const path = require('path');

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
    // Creates index.html
    new HtmlWebpackPlugin({
      title: 'React Starter'
    })
  ],

  resolve: {
    // Overrides default. js is required for Webpack plugins
    extensions: ['.js', '.tsx']
  }
};
