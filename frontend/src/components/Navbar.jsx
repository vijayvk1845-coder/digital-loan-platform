import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="site-nav">
      <Link className="brand" to="/" aria-label="Lendwise home">Lendwise</Link>
      <div className="nav-links">
        <Link to="/">Overview</Link>
        <Link to="/apply">Applications</Link>
        <Link to="/credit-assessment">Credit risk</Link>
      </div>
      <div className="nav-profile"><span className="profile-avatar">AS</span><span>Alex Stone</span><span className="profile-chevron">⌄</span></div>
    </nav>
  );
}