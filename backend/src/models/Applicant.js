const pool = require('../config/db');

const Applicant = {
  async create({ full_name, email, phone, dob, annual_income, employment_status }) {
    const result = await pool.query(
      `INSERT INTO applicants (full_name, email, phone, dob, annual_income, employment_status)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [full_name, email, phone, dob, annual_income, employment_status]
    );
    return result.rows[0];
  },
  async findById(id) {
    const result = await pool.query('SELECT * FROM applicants WHERE id = $1', [id]);
    return result.rows[0];
  },
  async findAll() {
    const result = await pool.query('SELECT * FROM applicants ORDER BY created_at DESC');
    return result.rows;
  },
};

module.exports = Applicant;