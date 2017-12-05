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

module.exports = {
  belongsToPolyfill
};
