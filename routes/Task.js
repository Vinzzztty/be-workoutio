const express = require('express');
const router = express.Router();
const taskController = require('../controller/taskController');

router.post('/', taskController.createTask);
router.get('/', taskController.getTasks);

module.exports = router