const chunkSorter = require('html-webpack-plugin/lib/chunksorter');

function belongsToPolyfill(module, polyfillEntry) {
  // When in Webpack dev server, our entry points will have a parent. So check the chain.
  const belongs = getIssuerChain(module).includes(polyfillEntry);

  if (module.context.includes('core-js') && !belongs) {
    throw new Error('Unexpected core-js not belonging to the polyfill entry');
  }

  return belongs;
}

function getEntry(module) {
  return module.depth === 0 ? module : getEntry(module.issuer);
}

function getIssuerChain(module) {
  if (module.depth === 0) {
    return [];
  }

  return getIssuerChain(module.issuer).concat(module.issuer.rawRequest);
}

/**
 * Sort normally by dependency, but put polyfills loader before the application/vendor code.
 */
function sortChunksByDependencyAccommodatingPolyfillsLoader(chunks) {
  const sorted = chunkSorter.dependency(chunks);

  const polyfillsLoaderIndex = sorted.findIndex(chunk => chunk.names.includes('polyfills-loader'));
  const runtimeManifestIndex = sorted.findIndex(chunk => /^runtime-manifest_/.test(chunk.names[0]));

  const [polyfillsLoader] = sorted.splice(polyfillsLoaderIndex, 1);
  sorted.splice(runtimeManifestIndex + 1, 0, polyfillsLoader);

  return sorted;
}

module.exports = {
  belongsToPolyfill,
  sortChunksByDependencyAccommodatingPolyfillsLoader
};
