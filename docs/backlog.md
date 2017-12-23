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
  <details>
    Use test-id attributes: http://blog.scottlogic.com/2016/03/11/independent-testers-question.html
  </details>
* Framework (Jest)
* Mocking (Jest)
* Mutation testing (Stryker)
* Runner (Jest)
* Utilities (Enzyme)
* Workflows - debugging, watching

Build:
* Continuous integration target (build, check, & test) & server config

Development:
* Hot reloading
* Micro-generator templates (Plop)
  <details>
    Are editor templates better for when you have just one file?
    Plop presumably requires you to navigate to the right directory to run it.
  </details>
* Tool configuration:
  * Chrome workspace

Source control:
* Commit hook - lint staged files & run related tests (lint-staged)
* Commit hook - message standards
* Link to recommended Git configuration

Deployment:
* Detect new deployment & prompt for reload
  <details>
    Include build number in index.html (meta tag or global var).
    Emit an extra file to be deployed, containing just the build number.
    Script periodically polls for this extra files and compares the build numbers.
    It could then prompt for reload.
    A changelog file could also be deployed, fetched, and its contents shown in the prompt.
  </details>
* Per-environemnt configuration
  <details>
    https://webpack.js.org/plugins/define-plugin/#service-urls ?
    https://webpack.js.org/plugins/environment-plugin/#dotenvplugin
  </details>

Operations:
* Logging to the server

Other:
* Dependency insecure/outdated watcher (David, nsp?)
* Icons (Font Awesome SVG)
  <details>
    https://webpack.js.org/guides/typescript/#importing-other-assets
  </details>
* NPM shrinkwrap
* NPM update check helper (npm-check)
* Unsupported browser warning
  <details>
    Selenium appears to support running IE in different modes via a registry setting,
    or injecting an X-UA header in the response - either of which would be simpler than
    running VMs with older IEs.
  </details>
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

Readme:
* Licence
* Readme
  * Badges (build status, GitHub downloads, David dependencies)
