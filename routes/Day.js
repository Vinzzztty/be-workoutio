const express = require('express');
const router = express.Router();
const dayController = require('../controller/dayController');

router.post('/', dayController.createDay);
router.get('/', dayController.getDays);

module.exports = router;
