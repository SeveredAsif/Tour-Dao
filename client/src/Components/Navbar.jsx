import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">Tour De</Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/home" className="nav-links">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/destinations" className="nav-links">Destinations</Link>
          </li>
          <li className="nav-item">
            <Link to="/flights" className="nav-links">Flights</Link>
          </li>
          <li className="nav-item">
            <Link to="/hotels" className="nav-links">Hotels</Link>
          </li>
          <li className="nav-item profile-dropdown">
            <FontAwesomeIcon icon={faUser} className="profile-icon" />
            <div className="profile-dropdown-content">
              <Link to="/dashboard">Dashboard</Link>
              <Link to="/logout">Logout</Link>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
