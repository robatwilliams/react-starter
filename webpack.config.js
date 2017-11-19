const path = require('path');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devServer: {
    historyApiFallback: true,
    overlay: { warnings: false, errors: true },
    port: 3000,
    proxy: {
      // Add backend servers here to avoid CORS restrictions
    }
  },

  // Cheaper alternative to eval-source-map, since column mappings (for inline breakpoints) are
  // broken in Chrome 62 anyway - even for the most basic standalone tsc-only or webpack-only examples.
  devtool: 'cheap-module-eval-source-map',

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
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },

  plugins: [
    // Cleans before building. Avoid removing the folder so it doesn't briefly disappear from editor view
    new CleanWebpackPlugin(['dist/**/*']),

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
