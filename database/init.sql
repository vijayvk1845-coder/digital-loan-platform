CREATE TABLE IF NOT EXISTS applicants (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(150) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    phone VARCHAR(20),
    dob DATE,
    annual_income NUMERIC(12,2),
    employment_status VARCHAR(50),
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS loans (
    id SERIAL PRIMARY KEY,
    applicant_id INTEGER REFERENCES applicants(id) ON DELETE CASCADE,
    loan_amount NUMERIC(12,2) NOT NULL,
    loan_purpose VARCHAR(100),
    tenure_months INTEGER,
    status VARCHAR(20) DEFAULT 'PENDING',
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS credit_assessments (
    id SERIAL PRIMARY KEY,
    applicant_id INTEGER REFERENCES applicants(id) ON DELETE CASCADE,
    credit_score INTEGER NOT NULL,
    risk_category VARCHAR(20) NOT NULL,
    remarks TEXT,
    assessed_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS documents (
    id SERIAL PRIMARY KEY,
    applicant_id INTEGER REFERENCES applicants(id) ON DELETE CASCADE,
    document_type VARCHAR(50),
    file_path VARCHAR(255),
    uploaded_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_loans_applicant ON loans(applicant_id);
CREATE INDEX IF NOT EXISTS idx_credit_applicant ON credit_assessments(applicant_id);