const HtmlModuleScriptWebpackPlugin = require('./HtmlModuleScriptWebpackPlugin');

const fProd = require('./webpack.prod');

// Must be shared across configurations
const htmlModuleScriptPlugin = new HtmlModuleScriptWebpackPlugin({
  entrySuffix: '_modern'
});

module.exports = [
  (env, argv) => fProd(env, argv, {
    entrySuffix: '_legacy',
    es5: true,
    htmlModuleScriptPlugin
  }),

  (env, argv) => fProd(env, argv, {
    entrySuffix: '_modern',
    htmlModuleScriptPlugin
  })
];
