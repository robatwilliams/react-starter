// Must go first, in order to be available to other modules that may need them while initialising.
import './polyfills';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './App';
import { initErrorTracking } from './error-tracking';

if (process.env.NODE_ENV !== 'production') {
  console.log('Running from development build');
} else {
  initErrorTracking();
}

const root = document.createElement('div');
document.body.appendChild(root);

ReactDOM.render(
  <Router>
    <App />
  </Router>
, root);

Promise.resolve().then(value => console.log('Promises work!'));

fetch('/')
  .then(response => response.text())
  .then(text => console.log('Fetch works! Fetched: ' + text.substr(0, 10)));
