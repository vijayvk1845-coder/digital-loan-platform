import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav>
      <Link to="/">Dashboard</Link>{' '}
      <Link to="/apply">Apply for Loan</Link>{' '}
      <Link to="/credit-assessment">Credit Assessment</Link>
    </nav>
  );
}