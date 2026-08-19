import React, { useEffect, useState } from 'react';
import { getLoans } from '../services/api';

export default function Dashboard() {
  const [loans, setLoans] = useState([]);
  useEffect(() => {
    getLoans().then(setLoans).catch(() => setLoans([]));
  }, []);

  return (
    <div>
      <h1>Loan Dashboard</h1>
      <ul>
        {loans.map((loan) => (
          <li key={loan.id}>#{loan.id} — {loan.loan_purpose} — {loan.status}</li>
        ))}
      </ul>
    </div>
  );
}