import React from 'react';
import './NavBar.css'; 

import logohome from '../imgs/websitelogo.png';


const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={logohome} alt="Logo" />
      </div>
      <ul className="navbar-links">
        <li>
            <a href="/">Home</a>
        </li>
        <li>
            <a href="/products">Products</a>
        </li>
        <li>
            <a href="/account">Accounts</a>
        </li>
        <li>
            <a href="/contact">Contact</a>
        </li>
        <li>
            <i className="fas fa-shopping-cart"></i>
        </li>
      </ul>
      <div className="navbar-menu">
        <i className="fas fa-bars"></i>
      </div>
    </nav>
  );
};

export default NavBar;
