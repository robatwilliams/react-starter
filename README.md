# React Starter

## Features
Framework & ecosystem:
* React
* React Router

Code:
* TypeScript

Styling:
* CSS Modules

Build:
* Webpack
* Minification
* Tree-shaking
* Compression (gzip)
* Polyfills
* ⚠ ES6 build for modern browsers
  * Not on `master` branch, due to a loading-order problem and a separate unresolved
    [issue](https://github.com/philipwalton/webpack-esnext-boilerplate/issues/1)
    that causes legacy browsers to download (but not run) both builds.
    See branch `modern-browser-build`.
* App/vendor code split
* Long-term caching
* Bundle analysis
* Source maps (TypeScript, styles)

Development:
* Webpack Dev Server
* Tool configuration
  * Visual Studio Code (settings)

Operations:
* Error tracking service integration (Sentry)

## Non-features
Some features that might be desired in a project setup, and/or expected in a starter project,
are not included. They are listed here for clarity and also as a list of things you may
wish to consider. The reasons are driven by what I find interesting and useful to learn about.

Feature | Reason
--------|--------
Analytics | Use-case specific
Build process optimisation for large codebases | Specific to individual app size & structure
Comprehensive TSLint rule configuration | Project in its own right, personal/team preference
Conditional polyfill loading | Complexity not justified for most apps
CSS in JS | Not convinced it's a good idea
Font loading | Trivial, not commonly needed
Image loading & optimisation | Not needed for apps I typically work on
Localisation | Use-case specific
Offline support | Not needed for apps I typically work on
Running unit tests in browsers (rather than Node) | Jest works this way, it's sufficient
Server-side rendering | Not needed for apps I typically work on
Stylesheet analysis ([Parker](https://github.com/katiefenn/parker/)) | Only supports plain CSS
Task runner | Webpack is sufficient so far
Visual regression testing (e.g. [BackstopJS](https://github.com/garris/BackstopJS)) | Out of scope
Web App Manifest | Not a mobile app starter

## Principles
Both the feature set and implementation are driven by these high-level principles. These should
help the project remain understandable, maintainable, and stable.

1. Simplicity
1. No hidden magic
1. Explain the "why" when it isn't clear
1. No obscure dependencies
1. No unstable features/dependencies/tools

## Tooling
### Webpack bundle analysis
`webpack-bundle-analyzer` is included; see the `analyze-bundle` NPM script.
There are also [other tools](https://webpack.js.org/guides/code-splitting/#bundle-analysis)
that can consume the `bundle-stats.json` file that Webpack generates:
[official analyse tool](https://webpack.github.io/analyse),
[webpack-chart](https://alexkuz.github.io/webpack-chart),
[webpack-visualizer](https://chrisbateman.github.io/webpack-visualizer).
