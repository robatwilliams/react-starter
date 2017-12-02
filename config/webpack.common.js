const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
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
      { test: /\.tsx$/, loader: 'awesome-typescript-loader' }
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
    extensions: ['.js', '.tsx']
  }
};
