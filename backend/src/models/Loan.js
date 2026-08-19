const pool = require('../config/db');

const Loan = {
  async create({ applicant_id, loan_amount, loan_purpose, tenure_months, status = 'PENDING' }) {
    const result = await pool.query(
      `INSERT INTO loans (applicant_id, loan_amount, loan_purpose, tenure_months, status)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [applicant_id, loan_amount, loan_purpose, tenure_months, status]
    );
    return result.rows[0];
  },
  async updateStatus(id, status) {
    const result = await pool.query(
      'UPDATE loans SET status = $1, updated_at = NOW() WHERE id = $2 RETURNING *',
      [status, id]
    );
    return result.rows[0];
  },
  async findAll() {
    const result = await pool.query('SELECT * FROM loans ORDER BY created_at DESC');
    return result.rows;
  },
};

module.exports = Loan;