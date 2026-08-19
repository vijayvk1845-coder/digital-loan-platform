const Loan = require('../models/Loan');

exports.createLoan = async (req, res) => {
  try {
    res.status(201).json(await Loan.create(req.body));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.listLoans = async (req, res) => {
  try {
    res.json(await Loan.findAll());
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateLoanStatus = async (req, res) => {
  try {
    res.json(await Loan.updateStatus(req.params.id, req.body.status));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};