import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">TravelSite</Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-links">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/destinations" className="nav-links">Destinations</Link>
          </li>
          <li className="nav-item">
            <Link to="/flights" className="nav-links">Flights</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
