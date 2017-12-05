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
* Polyfills - loaded only when needed (all or none)
* ⚠ ES6 build for modern browsers
  * Not on `master` branch, due to an unresolved
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

## Non-features
* Analytics
* Build process optimisation for large codebases
* Comprehensive TSLint rule configuration
* CSS in JS
* Font loading
* Image loading & optimisation
* Localisation
* Offline support
* Running unit tests in browsers (rather than Node)
* Server-side rendering
* Stylesheet analysis (Parker)
* Task runner
* Visual regression testing (e.g. BackstopJS)
* Web App Manifest

## Principles
1. Simplicity
1. No hidden magic
1. Explain the "why" when it isn't clear
1. No obscure dependencies
1. No unstable features/tools

## Tooling
### Webpack bundle analysis
`webpack-bundle-analyzer` is included; see the `analyze-bundle` NPM script.
There are also [other tools](https://webpack.js.org/guides/code-splitting/#bundle-analysis)
that can consume the `bundle-stats.json` file that Webpack generates:
[official analyse tool](https://webpack.github.io/analyse),
[webpack-chart](https://alexkuz.github.io/webpack-chart),
[webpack-visualizer](https://chrisbateman.github.io/webpack-visualizer).
