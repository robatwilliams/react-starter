const path = require('path');

const CleanWebpackPlugin = require('clean-webpack-plugin');

const common = require('./webpack.common.js');

const rootPath = path.resolve(__dirname, '../');

module.exports = Object.assign({}, common, {
  devtool: 'source-map',

  output: Object.assign({}, common.output, {
    path: path.resolve(rootPath, 'dist')
  }),

  plugins: common.plugins.concat([
    // Cleans before building. Avoid removing the folder so it doesn't briefly disappear from editor view
    new CleanWebpackPlugin(['dist/**/*'], { root: rootPath })
  ])
});
