const path = require('path');

const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const HtmlAssetReferenceWebpackPlugin = require('./HtmlAssetReferenceWebpackPlugin');
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

    // Keeps module ids consistent between runs.
    // Added so that ScriptExtHtmlWebpackPlugin can find a polyfills-loader on both legacy/modern runs.
    new webpack.HashedModuleIdsPlugin(),

    // Make the HTML page load a modern build if the browser supports it, otherwise a legacy one
    options.htmlModuleScriptPlugin,

    // Replaces scripts with variables containing their src, so they can be conditionally loaded
    // Placed after htmlModuleScriptPlugin beacuse that doesn't understand inline scripts.
    new HtmlAssetReferenceWebpackPlugin(['polyfills_']),

    // Inlines the polyfills loader & adds attributes to others to modify behaviour
    new ScriptExtHtmlWebpackPlugin({
      /*
      * Inlining the loader causes a "webpackJsonp is not defined" error in module-supporting
      * browsers, because type=module scripts are defer-by-default. This causes the loader to
      * run before the manifest has loaded.
      *
      * Because many (all?) module-supporting browsers don't need the current polyfills
      * (Promise & fetch), the impact for those is just the console error.
      *
      * We could get around that by not inlining the loader, and defering it, but then the
      * loader wouldn't run early enough to insert the polyfills tag in the deferreds run-order
      * queue at the right position. The polyfills would run after the application code - too late.
      */
      // Don't block subsequents' loading. Except manifest - needs to be run before polyfills loader.
      defer: /^(?!runtime-manifest).*$/,

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

module.exports = (env, argv, optionsArg) => {
  const options = Object.assign({}, optionsArg, {
    prod: true
  });

  const common = fCommon(env, argv, options);
  const prod = fConfig(env, argv, options, common);

  return Object.assign({}, common, prod);
};
