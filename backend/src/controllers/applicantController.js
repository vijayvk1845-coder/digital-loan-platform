const Applicant = require('../models/Applicant');

exports.createApplicant = async (req, res) => {
  try {
    const applicant = await Applicant.create(req.body);
    res.status(201).json(applicant);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.listApplicants = async (req, res) => {
  try {
    res.json(await Applicant.findAll());
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getApplicant = async (req, res) => {
  try {
    const applicant = await Applicant.findById(req.params.id);
    if (!applicant) return res.status(404).json({ error: 'Applicant not found' });
    res.json(applicant);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};