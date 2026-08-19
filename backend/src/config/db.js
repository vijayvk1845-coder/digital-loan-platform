const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.DB_HOST || 'database',
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER || 'loan_admin',
  password: process.env.DB_PASSWORD || 'change_me',
  database: process.env.DB_NAME || 'loan_origination_db',
});

module.exports = pool;