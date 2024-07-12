const express = require('express');
const router = express.Router();
const planController = require('../controller/planController');

router.post('/', planController.createPlan);
router.get('/', planController.getPlans);

module.exports = router;