# React Starter
Starter project, whose main purpose is to serve as a place for me to try out new & interesting tech.

Based around React, but covers a wide range of related & unrelated frontend tech.

I haven't used this to start a real project, and wouldn't recommend that you do either. You might
however find parts of it useful as a reference. Do create an issue with any feedback/bugs. There
are many ways of starting a new frontend project, and none of them in my opinion are a substitute
to knowing your tools and understanding how your project works under the hood.

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
  * Not on `master` branch, due to an unresolved legacy browser
    [issue](https://github.com/philipwalton/webpack-esnext-boilerplate/issues/1)
    that causes them to download (but not run) both builds.
    See branch `modern-browser-build`.
* App/vendor code split
* Long-term caching
* Bundle analysis
* Source maps (TypeScript, libraries, styles)

Development:
* Webpack Dev Server
* Tool configuration
  * Visual Studio Code (settings)

Deployment:
* Server configuration (for Apache)
  * Including: fallback for client-side routes, caching, precompressed files, restricted source map files

Operations:
* Error tracking service integration (Sentry)

Other:
* Browser support: common modern desktop browsers, IE11 and later

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

## Getting started
There are no releases, and the commit history is the changelog.

Forking the project as a starting point would give you a lot of probably-unwanted history,
so consider making a new repository and committing the latest version as a single commit. Note which version you started with, by including the commit hash and date of the current version
in the commit message. This will allow you to review future additions and fixes that you may want
to pull into your project.

## Tooling
### Webpack bundle analysis
`webpack-bundle-analyzer` is included; see the `analyze-bundle` NPM script.
There are also [other tools](https://webpack.js.org/guides/code-splitting/#bundle-analysis)
that can consume the `bundle-stats.json` file that Webpack generates:
[official analyse tool](https://webpack.github.io/analyse),
[webpack-chart](https://alexkuz.github.io/webpack-chart),
[webpack-visualizer](https://chrisbateman.github.io/webpack-visualizer).

## Smoke checks
A few things to check after making big additions/changes, in addition to what is automated.

* Both dev & prod builds work in Chrome & IE11
* Webpack bundle analysis looks ok
