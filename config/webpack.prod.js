const path = require('path');

const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const UglifyJSWebpackPlugin = require('uglifyjs-webpack-plugin');

const fCommon = require('./webpack.common.js');

const rootPath = path.resolve(__dirname, '../');

const fConfig = (env, argv, options, common) => ({
  devtool: 'source-map',

  output: {
    filename: '[name].[chunkhash].js',
    path: path.resolve(rootPath, 'dist')
  },

  performance: {
    // Prevent limit breaches going unnoticed
    hints: 'error'
  },

  plugins: common.plugins.concat([
    // Add a notice at the top of each entry point file
    new webpack.BannerPlugin({
      banner: 'Built with react-starter. Coypright etc.\n@preserve'
    }),

    // Cleans before building. Avoid removing the folder so it doesn't briefly disappear from editor view
    new CleanWebpackPlugin(['dist/**/*'], { root: rootPath }),

    // Prepare gzipped files ahead of time, for server to serve
    new CompressionWebpackPlugin(),

    // Put libraries (e.g. React) into production mode
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    }),

    // Inlines the polyfills loader & prevents the default polyfills tag from loading
    new ScriptExtHtmlWebpackPlugin({
      custom: {
        test: 'polyfills.',
        attribute: 'type',
        value: 'text/plain'
      },
      inline: 'polyfills-loader'
    }),

    // Minification & tree shaking
    new UglifyJSWebpackPlugin({
        parallel: true,
        sourceMap: true,
        uglifyOptions: {
          output: {
            comments: 'some' // preserve licences etc.
          },
          warnings: true
        },
        warningsFilter: sourceAbsolutePath => !sourceAbsolutePath.includes('node_modules')
    })
  ])
});

module.exports = (env, argv) => {
  const options = {
    prod: true
  };

  const common = fCommon(env, argv, options);
  const prod = fConfig(env, argv, options, common);

  return Object.assign({}, common, prod);
};
