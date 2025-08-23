import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <Link to="/" className="navbar-logo">
          Finance<span className="text-primary">Tracker</span>
        </Link>
        {/* We have removed the login/logout buttons */}
      </div>
    </nav>
  );
};

export default Navbar;