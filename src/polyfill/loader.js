// ES5 only in this file
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

  // append after the currently-executing script tag
  document.body.appendChild(script);
}

loader(window.webpackManifest['polyfills.js']);
