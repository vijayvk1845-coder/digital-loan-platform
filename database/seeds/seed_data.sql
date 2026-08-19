INSERT INTO applicants (full_name, email, phone, dob, annual_income, employment_status)
VALUES
('Arun Kumar', 'arun.kumar@example.com', '9876543210', '1995-04-12', 650000, 'Salaried'),
('Priya Sharma', 'priya.sharma@example.com', '9123456780', '1990-08-22', 820000, 'Self-Employed');

INSERT INTO loans (applicant_id, loan_amount, loan_purpose, tenure_months, status)
VALUES
(1, 500000, 'Home Renovation', 36, 'PENDING'),
(2, 1200000, 'Business Expansion', 60, 'APPROVED');

INSERT INTO credit_assessments (applicant_id, credit_score, risk_category, remarks)
VALUES
(1, 720, 'MEDIUM', 'Stable income, moderate existing liabilities'),
(2, 780, 'LOW', 'Strong repayment history');