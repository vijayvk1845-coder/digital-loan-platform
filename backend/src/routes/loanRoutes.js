const express = require('express');
const router = express.Router();
const loanController = require('../controllers/loanController');

router.post('/', loanController.createLoan);
router.get('/', loanController.listLoans);
router.patch('/:id/status', loanController.updateLoanStatus);

module.exports = router;
