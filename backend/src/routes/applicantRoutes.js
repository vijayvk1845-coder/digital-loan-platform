const express = require('express');
const router = express.Router();
const applicantController = require('../controllers/applicantController');

router.post('/', applicantController.createApplicant);
router.get('/', applicantController.listApplicants);
router.get('/:id', applicantController.getApplicant);

module.exports = router;