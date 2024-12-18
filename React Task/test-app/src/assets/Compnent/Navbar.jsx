import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Import the CSS file

function Navbar() {
  return (
    <div className="navbar-container">
      <nav className="navbar">
        <ul className="navbar-list">
          <li className="navbar-item">
            <Link to="/" className="navbar-link">Home</Link>
            <span className="popup">Go to Home</span>
          </li>
          <li className="navbar-item">
            <Link to="/Mainpage" className="navbar-link">Meal</Link>
            <span className="popup">Explore Meals</span>
          </li>
          <li className="navbar-item">
            <Link to="/Potter" className="navbar-link">Potter</Link>
            <span className="popup">Potter Fans Zone</span>
          </li>
          <li className="navbar-item">
            <Link to="/Bank" className="navbar-link">Bank</Link>
            <span className="popup">Bank Details</span>
          </li>
          <li className="navbar-item">
            <Link to="/Cocktail" className="navbar-link">Cocktail</Link>
            <span className="popup">Find Cocktails</span>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
