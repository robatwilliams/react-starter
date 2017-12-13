import Raven from 'raven-js';

const projectId = 258387;
const publicKey = '99f0cc59f9164101a3fe2767c0100d16';

const options: Raven.RavenOptions = {
  // debug: true,
  environment: 'local', // TODO populate based on runtime environment

  // Needs to match a release with uploaded sourcemaps
  release: '0.1.0'   // TODO populate based on version number or Git tag
};

export function initErrorTracking() {
  const dsn = `https://${publicKey}@sentry.io/${projectId}`;
  Raven.config(dsn, options).install();

  // Unhandled promise rejection; not currently widely supported in browsers
  window.addEventListener('unhandledrejection', event => Raven.captureException(event.reason));

  // HTTP error. e.g. offline, or sentry.io blocked by a privacy-defence browser extension
  window.addEventListener('ravenFailure', event =>
    console.warn('Failed to send error data to Sentry. See previous HTTP error for details.'));

  // Further integration with Redux & Saga available:
  // https://docs.sentry.io/clients/javascript/integrations/react/#redux
};
