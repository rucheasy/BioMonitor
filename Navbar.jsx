import React from 'react';
import { Activity } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <Activity className="navbar-icon" size={24} />
          <span className="navbar-title">Health Monitor</span>
        </div>
        <div className="navbar-links">
          <a href="#" className="nav-link active">Dashboard</a>
          <a href="#" className="nav-link">About</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
