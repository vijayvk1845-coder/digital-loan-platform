<h2>Digital Loan Application</h2>
<p>Please enter your details to apply for a loan.</p>
import React from 'react';
import LoanForm from '../components/LoanForm';

export default function LoanApplication() {
  const applicantId = 1; // would come from logged-in user in a real app
  return (
    <div>
      <h1>New Loan Application</h1>
      <LoanForm applicantId={applicantId} />
    </div>
  );
}