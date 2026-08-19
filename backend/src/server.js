require('dotenv').config();
const express = require('express');
const cors = require('cors');

const applicantRoutes = require('./routes/applicantRoutes');
const loanRoutes = require('./routes/loanRoutes');
const creditRoutes = require('./routes/creditRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => res.json({ status: 'ok', service: 'loan-origination-backend' }));

app.use('/api/applicants', applicantRoutes);
app.use('/api/loans', loanRoutes);
app.use('/api/credit', creditRoutes);

app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));

module.exports = app;