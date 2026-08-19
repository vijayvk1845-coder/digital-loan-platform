const express = require('express');
const router = express.Router();
const creditController = require('../controllers/creditController');

router.post('/assess', creditController.assessCredit);
router.get('/:applicantId', creditController.getAssessments);

module.exports = router;