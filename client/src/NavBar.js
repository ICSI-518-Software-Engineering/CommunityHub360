import React from 'react';
import './NavBar.css';
import { Link } from 'react-router-dom';


const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        
        <div className="navbar-item">
          <Link to="/home" className="nav-link">Home</Link></div>
        
        <div className="navbar-item">Maintenance</div>
        
        <div className="navbar-item">
        <Link to="/guestparking" className="nav-link">Parking</Link>
        </div>
        
        <div className="navbar-item">Announcements</div>
        
        <div className="navbar-item">
        <Link to="/aboutus" className="nav-link">AboutUs</Link>
        </div>
      </div>
      
      <div className="navbar-right">
        <div className="navbar-item account-logo">
        <Link to="/login" className="nav-link">Account</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;