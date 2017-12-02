import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import Navigation from './Navigation';
import { cube } from './util';

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
  const cubed = cube(2);

  return <div>Alpha component. The cube of 2 is {cubed}</div>;
}

function NotFound({ location }) {
  return <div>Not Found: {location.pathname}</div>;
}
