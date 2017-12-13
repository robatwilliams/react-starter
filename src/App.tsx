import Raven from 'raven-js';
import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Route, Switch } from 'react-router-dom';

import ErrorTrackingExample from './ErrorTrackingExample';
import Navigation from './Navigation';
import { cube } from './util';

export default class App extends React.Component {

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    // Capture with additional errorInfo, which Raven global catching wouldn't have
    Raven.captureException(error, { extra: errorInfo });

    // Error boundaries rethrow in development mode, so will be reported to Sentry twice.
  }

  render() {
    return <AppContent />;
  }
}

function AppContent() {
  return (
    <div>
      <Navigation />
      <main>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/alpha" component={Alpha} />
          <Route path="/example-errorTracking" component={ErrorTrackingExample} />
          <Route component={NotFound} />
        </Switch>
      </main>
    </div>
  );
}

function Home() {
  return <div>Home component</div>;
}

function Alpha() {
  const cubed = cube(2);

  return <div>Alpha component. The cube of 2 is {cubed}</div>;
}

function NotFound({ location }: RouteComponentProps<void>) {
  return <div>Not Found: {location.pathname}</div>;
}
