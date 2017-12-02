# Features backlog
Framework & ecosystem:
* Directory structure
* Redux
  * Immutable state invariant
  * Logger
  * Reselect
  * Saga, Tale, or Thunk
  * Unhandled action detector

Code:
* Polyfills - when needed, not targeted
  <details>
    https://webpack.js.org/guides/shimming/#loading-polyfills
    https://webpack.js.org/guides/shimming/#further-optimizations
    https://philipwalton.com/articles/loading-polyfills-only-when-needed/
    https://hackernoon.com/10-things-i-learned-making-the-fastest-site-in-the-world-18a0e1cdf4a7#c665
  </details>
* TSLint

Styling:
* Autoprefixer
* Extension language (e.g. SASS)
* Formatter (e.g. Stylelint `--fix`, Prettier)
* Framework (e.g. Bootstrap)
* Linter (e.g. Stylelint, sass-lint)
* Reset (e.g. Reboot)

Testing:
* Assertions (Jest)
* Coverage - with source map (Istanbul built in to Jest)
* End to end testing - in multiple browsers (e.g. Nightwatch)
* Framework (Jest)
* Mocking (Jest)
* Mutation testing (Stryker)
* Runner (Jest)
* Utilities (Enzyme)
* Workflows - debugging, watching

Build:
* App/vendor code split
  <details>
    https://webpack.js.org/concepts/entry-points/#separate-app-and-vendor-entries
    https://webpack.js.org/guides/build-performance/#dlls
  </details>
* Compression
* Continuous integration target (build, check, & test) & server config
* ES6 build for modern browsers
* Long-term caching
  <details>
    https://medium.com/webpack/predictable-long-term-caching-with-webpack-d3eee1d3fa31
    https://survivejs.com/webpack/optimizing/separating-manifest/
    https://webpack.js.org/guides/build-performance/#minimal-entry-chunk
  </details>

Development:
* Hot reloading
* Micro-generator templates (Plop)
* Tool configuration:
  * Chrome workspace

Source control:
* Commit hook - lint staged files & run related tests (lint-staged)
* Commit hook - message standards
* Link to recommended Git configuration

Deployment:
* Apache configuration (caching, history API)
* Detect new deployment & prompt for reload
  <details>
    Include build number in index.html (meta tag or global var).
    Emit an extra file to be deployed, containing just the build number.
    Script periodically polls for this extra files and compares the build numbers.
    It could then prompt for reload.
    A changelog file could also be deployed, fetched, and its contents shown in the prompt.
  </details>
* Library source maps (off by default?)
* Per-environemnt configuration
  <details>
    https://webpack.js.org/plugins/define-plugin/#service-urls ?
    https://webpack.js.org/plugins/environment-plugin/#dotenvplugin
  </details>
* Security-related HTTP headers

Operations:
* Error tracking service integration
* Logging to the server

Other:
* Dependency insecure/outdated watcher (David)
* Icons (Font Awesome SVG)
  <details>
    https://webpack.js.org/guides/typescript/#importing-other-assets
  </details>
* NPM shrinkwrap
* NPM update check helper (npm-check)
* Unsupported browser warning
* Version-aware application
  <details>
    https://webpack.js.org/plugins/define-plugin/#usage (but with version number rather than hash)
  </details>

Tooling recommendations:
* Chrome extensions (React, Redux)
* Microsoft IE virtual machines
* Visual Studio Code extensions
  * Formatting
  * Linting
  * Snippets
* Webpack bundle analysis
  <details>
    https://webpack.js.org/guides/code-splitting/#bundle-analysis
  </details>

Readme:
* Licence
* Readme
  * Badges (build status, GitHub downloads, David dependencies)
  * Browser support (incl. IE11)
  * Getting started (without the history)
  * Headline tech & features
  * No releases. Commit history is the changelog
  * Short summary
  * Should you use a starter/c-r-a? Do you know what it's doing & assumptions?
  * Updating your application
  * Why yet another starter (learn & explore)