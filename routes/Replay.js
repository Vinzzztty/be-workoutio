const express = require('express');
const router = express.Router();
const replayController = require('../controller/replayController');

router.post('/', replayController.createReplay);
// router.get('/', replayController.getReplays);

module.exports = router;