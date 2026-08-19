import React, { useState } from 'react';
import { assessCredit } from '../services/api';

export default function CreditAssessment() {
  const [score, setScore] = useState(null);
  const [applicantId, setApplicantId] = useState('');
  const [creditScore, setCreditScore] = useState('');

  const handleAssess = async () => {
    setScore(await assessCredit({ applicant_id: applicantId, credit_score: creditScore }));
  };

  return (
    <div>
      <h1>Credit Risk Assessment</h1>
      <input placeholder="Applicant ID" value={applicantId} onChange={(e) => setApplicantId(e.target.value)} />
      <input placeholder="Credit Score" value={creditScore} onChange={(e) => setCreditScore(e.target.value)} />
      <button onClick={handleAssess}>Assess</button>
      {score && <p>Risk Category: {score.risk_category}</p>}
    </div>
  );
}