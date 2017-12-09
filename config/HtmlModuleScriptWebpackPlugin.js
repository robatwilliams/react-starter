const { concat, mapKeys, merge, uniq } = require('lodash');

/**
 * Tweaked from original by Mike Engel
 * https://github.com/jantimon/html-webpack-plugin/issues/782#issuecomment-331229728
 *
 * See: https://gist.github.com/robatwilliams/36a95119ae5adcd734a73f642f749cc3
 *
 * Use this with multiple Webpack configurations that generate different builds
 * for modern and legacy browsers. But use the same instance of the plugin in both configurations.
 *
 * It keeps track of assets seen in each build configuration, and appends script tags for
 * all the assets to subsequent builds - using type=module or nomodule to cause the appropriate
 * version of each one to be loaded.
 *
 * The HTML file will be written for each configuration, but only the last-emitted one (which will
 * overwrite any previous ones) will have all the asset tags.
 *
 * Many browsers (IE10, IE11, Firefox 57 at least) will download (but not run) both versions of
 * every asset - see https://github.com/philipwalton/webpack-esnext-boilerplate/issues/1
 */
function HtmlModuleScriptWebpackPlugin(options) {
  this.options = options;
  this.sharedAssets = { js: [], chunks: [] };
}

HtmlModuleScriptWebpackPlugin.prototype = {

  apply: function (compiler) {
    compiler.plugin('compilation', compilation => {
      compilation.plugin('html-webpack-plugin-before-html-processing', this.beforeHtmlProcessing.bind(this));
      compilation.plugin('html-webpack-plugin-alter-asset-tags', this.alterAssetTags.bind(this));
    });
  },

  beforeHtmlProcessing: function (htmlPluginData, callback) {
    // Avoid chunk name collisions, since they can be named the same between builds
    // { 'main': {} } to { 'main_modern': {} } if the filename matches
    const renamedChunks = mapKeys(htmlPluginData.assets.chunks, (chunk, name) => {
      if (chunk.entry.includes(this.options.entrySuffix)) {
        return `${name}${this.options.entrySuffix}`;
      }

      return name;
    });

    this.sharedAssets = {
      js: uniq(concat(this.sharedAssets.js, htmlPluginData.assets.js)),
      chunks: merge(this.sharedAssets.chunks, renamedChunks)
    };

    callback(null, merge(htmlPluginData.assets, this.sharedAssets));
  },

  alterAssetTags: function (htmlPluginData, callback) {
    const body = htmlPluginData.body.map(assetTag => {
      const isModern = assetTag.attributes.src.includes(this.options.entrySuffix);
      const attributes = isModern ? { type: 'module' }: { nomodule: true };

      return merge(assetTag, { attributes });
    });

    callback(null, merge(htmlPluginData, { body }));
  }
};

module.exports = HtmlModuleScriptWebpackPlugin;
