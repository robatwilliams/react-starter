// ES5 only in this file

var supportsModule = document.createElement('script').noModule === false;

function loader(polyfillsScript) {
  var browserSupportsAll = window.fetch && window.Promise;

  if (!browserSupportsAll) {
    appendScript(polyfillsScript);
  }
}

function appendScript(src) {
  var script = document.createElement('script');
  script.src = src;

  // Async is the default for dynamically-inserted scripts
  script.async = false;

  // Don't block loading of subsequent scripts.
  // Since this loader is inline, and other defered scripts haven't yet been seen by the parser,
  // the inserted script will go before those in the run-order queue.
  script.defer = true;

  if (supportsModule) {
    script.type = 'module';
  }

  // append after the currently-executing script tag
  document.body.appendChild(script);
}

var polyfillsScript = assetReferences[supportsModule ? 'polyfills_modern' : 'polyfills_legacy'];
loader(polyfillsScript);
