const path = require('path');

const DotenvWebpack = require('dotenv-webpack');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const chunkSorter = require('html-webpack-plugin/lib/chunksorter');

const util = require('./webpack-util');
chunkSorter.dependencyAccommodatingPolyfillsLoader = util.sortChunksByDependencyAccommodatingPolyfillsLoader;

const rootPath = path.resolve(__dirname, '../');

const polyfillsEntry = './src/polyfill/polyfills.ts';

module.exports = (env, argv, options) => ({
  // Make the configuration independent of current working directory
  context: rootPath,

  entry: {
    main: './src/index.tsx',
    polyfills: polyfillsEntry,
    'polyfills-loader': './src/polyfill/loader.js'
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
            options: { sourceMap: !options.prod }
          }, {
            loader: 'css-loader',
            options: {
              camelCase: 'dashesOnly',
              localIdentName: '[name]__[local]--[hash:base64:5]',
              modules: true,

              // CSS source maps go in the bundle rather than separate file, so can't be for prod
              sourceMap: !options.prod
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

  plugins: [
    // Vendor chunk for libraries, separate from application code
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: (module, count) =>
        module.context.includes('node_modules') && !util.belongsToPolyfill(module, polyfillsEntry)
    }),

    // Webpack runtime & manifest chunk (needs to be the last CommonsChunk)
    new webpack.optimize.CommonsChunkPlugin({
      name: 'runtime-manifest',
      minChunks: Infinity // ensures no modules go in the chunk
    }),

    // Expose configuration variables to be built into the bundle
    new DotenvWebpack({
      path: './config/.env',
      safe: './config/.env.example.env'
    }),

    // Creates index.html
    new HtmlWebpackPlugin({
      // Conditional polyfill loading approach is not compatible with webpack dev server
      chunksSortMode: options.devServer ? 'dependency' : 'dependencyAccommodatingPolyfillsLoader',
      excludeChunks: options.devServer ? ['polyfills-loader'] : [],
      favicon: './src/favicon.ico',
      template: './src/index.html',
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
});
