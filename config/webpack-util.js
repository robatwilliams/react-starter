function belongsToPolyfill(module, polyfillEntry) {
  const belongs = getEntry(module).rawRequest === polyfillEntry;

  if (module.context.includes('core-js') && !belongs) {
    throw new Error('Unexpected core-js not belonging to the polyfill entry');
  }

  return belongs;
}

function getEntry(module) {
  return module.depth === 0 ? module : getEntry(module.issuer);
}

module.exports = {
  belongsToPolyfill
};
