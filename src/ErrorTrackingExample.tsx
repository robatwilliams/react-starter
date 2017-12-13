import Raven from 'raven-js';
import * as React from 'react';

export default class ErrorTrackingExample extends React.PureComponent {

  throw() {
    throw new Error('Thrown to be caught and captured elsewhere');
  }

  throwAndCatch() {
    try {
      throw new Error('Thrown to be caught immediately and captured');
    } catch (e) {
      Raven.captureException(e);
    }
  }

  throwAsync() {
    setTimeout(() => { throw new Error('Thrown after setTimeout, to be caught and captured elsewhere'); });
  }

  rejectPromise() {
    Promise.reject('Rejected promise, to be caught and captured by global event handler');
  }

  logMessage() {
    const locale = (navigator.languages && navigator.languages[0]) ||
      navigator.language || (navigator as any).userLanguage;

    // captureException & captureMessage accept additional information.
    // Some of this can be configured globally, to be merged with call-specific data.
    Raven.captureMessage(`A message to be logged`, {
      extra: {},
      level: 'info', // default: error
      tags: {
        // in addition to built-ins such as browser & os
        locale
      }
    });
  }

  login() {
    Raven.setUserContext({
      id: '1000',
      username: 'rob'
    });
  }

  logout() {
    Raven.setUserContext();
  }

  render() {
    return (
      <div>
        <button onClick={() => this.throw()}>Throw</button>
        <button onClick={() => this.throwAndCatch()}>Throw and catch</button>
        <button onClick={() => this.throwAsync()}>Throw async</button>
        <button onClick={() => this.rejectPromise()}>Reject promise</button>
        <button onClick={() => this.logMessage()}>Log a message</button>
        <button onClick={() => this.login()}>Login</button>
        <button onClick={() => this.logout()}>Logout</button>
      </div>
    );
  }
}
