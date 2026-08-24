import React, { useState } from 'react';
import { createLoan } from '../services/api';

export default function LoanForm({ applicantId }) {
  const [form, setForm] = useState({ loan_amount: '', loan_purpose: '', tenure_months: '' });
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = async (e) => {
    e.preventDefault();
    await createLoan({ ...form, applicant_id: applicantId });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="loan_amount" placeholder="Loan Amount" onChange={handleChange} />
      <input name="loan_purpose" placeholder="Loan Purpose" onChange={handleChange} />
      <input name="tenure_months" placeholder="Tenure (months)" onChange={handleChange} />
      <button type="submit">Submit Application</button>
    </form>
  );
}