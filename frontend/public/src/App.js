import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import LoanApplication from './pages/LoanApplication';
import CreditAssessment from './pages/CreditAssessment';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/apply" element={<LoanApplication />} />
        <Route path="/credit-assessment" element={<CreditAssessment />} />
        <Route path="/loan-status" element={<LoanStatus />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;