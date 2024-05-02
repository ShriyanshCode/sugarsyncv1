import React, { useState } from 'react';
import Dropdown from './Dropdown'; // Import the Dropdown component
import './Navbar.css';
function Navbar() {
  const [isOpen, setIsOpen] = useState(false); // State to manage dropdown visibility

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <a href="#" className="logo">SugarSync</a>
      <ul className="nav-links">
        <li><a href="#">Your Profile</a></li>
        <li><a href="#">Home</a></li>
       
        
        <li>
          <a href="#">CGM Monitor</a>
        </li>
        <li><a href="#">Contact</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;
