const path = require('path');

const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSWebpackPlugin = require('uglifyjs-webpack-plugin');

const common = require('./webpack.common.js');

const rootPath = path.resolve(__dirname, '../');

module.exports = Object.assign({}, common, {
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
    // Cleans before building. Avoid removing the folder so it doesn't briefly disappear from editor view
    new CleanWebpackPlugin(['dist/**/*'], { root: rootPath }),

    // Put libraries (e.g. React) into production mode
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    }),

    // Minification & tree shaking
    new UglifyJSWebpackPlugin({
        parallel: true,
        sourceMap: true,
        uglifyOptions: {
          output: {
            comments: 'some', // preserve licences etc.
            preamble: '/* Built with react-starter. Coypright etc. */'
          },
          warnings: true
        },
        warningsFilter: sourceAbsolutePath => !sourceAbsolutePath.includes('node_modules')
    })
  ])
});
