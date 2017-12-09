// Replaces scripts with a map of their src, so they can be conditionally loaded
function HtmlAssetReferenceWebpackPlugin(options) {
  this.options = options;
}

HtmlAssetReferenceWebpackPlugin.prototype = {

  apply: function (compiler) {
    compiler.plugin('compilation', compilation => {
      compilation.plugin('html-webpack-plugin-alter-asset-tags', this.alterAssetTags.bind(this));
    });
  },

  alterAssetTags: function (htmlPluginData, callback) {
    const body = htmlPluginData.body;

    const extract = body.filter(assetTag =>
      this.options.some(search => assetTag.attributes.src.includes(search))
    );

    const preserve = body.filter(assetTag => !extract.includes(assetTag));

    const references = extract.map(createAssetReferenceTag);
    const mapTag = createMapTag();

    htmlPluginData.body = [mapTag, ...references, ...preserve];

    callback(null, htmlPluginData);
  }
};

function createMapTag() {
  return {
    attributes: {},
    closeTag: true,
    innerHTML: `var assetReferences = (typeof assetReferences === 'undefined') ? {} : assetReferences;`,
    tagName: 'script'
  };
}

function createAssetReferenceTag(assetTag) {
  const src = assetTag.attributes.src;
  const key = src.match(/^[^\.]+/)[0];

  return Object.assign({}, assetTag, {
    attributes: {}, // drop; we don't want src
    innerHTML: `assetReferences['${key}'] = '${src}';`
  });
}

module.exports = HtmlAssetReferenceWebpackPlugin;
