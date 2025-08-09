const express = require('express');
const router = express.Router();
const Assessment = require('../models/assessmentModel');

// ✅ GET all assessments
router.get('/', async (req, res) => {
  try {
    let assessments = await Assessment.find();

    // If DB is empty, send dummy data so UI still loads
    if (!assessments || assessments.length === 0) {
      assessments = [
        {
          id: '1',
          subject: 'Mathematics',
          score: 92,
          maxScore: 100,
          percentage: 92,
          date: '2025-08-01',
          status: 'excellent',
          email: 'student@example.com'
        },
        {
          id: '2',
          subject: 'Science',
          score: 78,
          maxScore: 100,
          percentage: 78,
          date: '2025-07-28',
          status: 'good',
          email: 'student@example.com'
        }
      ];
    }

    res.json({ success: true, data: assessments });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Failed to fetch assessments' });
  }
});

module.exports = router;
