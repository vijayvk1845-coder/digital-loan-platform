const CreditAssessment = require('../models/CreditAssessment');

function calculateRisk(credit_score) {
  if (credit_score >= 750) return 'LOW';
  if (credit_score >= 650) return 'MEDIUM';
  return 'HIGH';
}

exports.assessCredit = async (req, res) => {
  try {
    const { applicant_id, credit_score, remarks } = req.body;
    const risk_category = calculateRisk(credit_score);
    const assessment = await CreditAssessment.create({ applicant_id, credit_score, risk_category, remarks });
    res.status(201).json(assessment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAssessments = async (req, res) => {
  try {
    res.json(await CreditAssessment.findByApplicant(req.params.applicantId));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};