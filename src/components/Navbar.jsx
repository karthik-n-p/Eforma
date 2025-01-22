import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";  // Import the styles for the Navbar

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        <h1>Edforma</h1>
      </div>
      <ul>
        <li>
          <Link to="/" className="nav-link">Home</Link>
        </li>
        <li>
          <Link to="/notes" className="nav-link">Notes</Link>
        </li>
        <li>
          <Link to="/video" className="nav-link">Video</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
