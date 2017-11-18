import * as React from 'react';
import { NavLink } from 'react-router-dom';

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
