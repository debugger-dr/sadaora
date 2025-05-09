import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

export default function Navbar({ handleLogout }) {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/" className="nav-link">Feed</Link>
        </li>
        <li>
          <Link to="/profile" className="nav-link">Profile</Link>
        </li>
      </ul>

      <button onClick={handleLogout} className="logout-btn">Logout</button>
    </nav>
  );
}
