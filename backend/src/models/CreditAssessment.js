const pool = require('../config/db');

const CreditAssessment = {
  async create({ applicant_id, credit_score, risk_category, remarks }) {
    const result = await pool.query(
      `INSERT INTO credit_assessments (applicant_id, credit_score, risk_category, remarks)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [applicant_id, credit_score, risk_category, remarks]
    );
    return result.rows[0];
  },
  async findByApplicant(applicant_id) {
    const result = await pool.query(
      'SELECT * FROM credit_assessments WHERE applicant_id = $1 ORDER BY assessed_at DESC',
      [applicant_id]
    );
    return result.rows;
  },
};

module.exports = CreditAssessment;