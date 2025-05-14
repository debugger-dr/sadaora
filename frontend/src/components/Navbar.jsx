import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

export default function Navbar({ handleLogout }) {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => isActive ? 'nav-link active-link' : 'nav-link'}
          >
            Feed
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/profile"
            className={({ isActive }) => isActive ? 'nav-link active-link' : 'nav-link'}
          >
            Profile
          </NavLink>
        </li>
      </ul>

      <button onClick={handleLogout} className="logout-btn">Logout</button>
    </nav>
  );
}
