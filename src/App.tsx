import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import Navigation from './Navigation';

export default function App() {
  return (
    <div>
      <Navigation />
      <main>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/alpha" component={Alpha} />
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
  return <div>Alpha component</div>;
}

function NotFound({ location }) {
  return <div>Not Found: {location.pathname}</div>;
}
