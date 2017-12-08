function loader(polyfillsScript) {
  var browserSupportsAll = window.fetch && window.Promise;

  if (!browserSupportsAll) {
    appendScript(polyfillsScript);
  }

  function appendScript(src) {
    var script = document.createElement('script');
    script.src = src;

    // append after the currently-executing script tag
    document.body.appendChild(script);
  }
}

loader(window.reactStarterPolyfills);
