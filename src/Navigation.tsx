import * as React from 'react';
import { NavLink as DefaultNavLink } from 'react-router-dom';

// Use require rather than import, because TypeScript doesn't understand. So usage is unchecked.
const styles = require('./navigation.css');

export default function Navigation() {
  return (
    <nav>
      <ul>
        <li><NavLink to="/" exact>Home</NavLink></li>
        <li><NavLink to="/alpha">Alpha</NavLink></li>
      </ul>
    </nav>
  );
}

function NavLink(props) {
  return <DefaultNavLink {...props} activeClassName={styles.isActive} />
}
