const express = require('express');
const router = express.Router();
const newPlanController = require('../controller/newPlanController');

router.post('/', newPlanController.createNewPlan);
router.post('/add', newPlanController.addExerciseToPlan);
router.get('/', newPlanController.getNewPlans);

module.exports = router