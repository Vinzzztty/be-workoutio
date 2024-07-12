const express = require("express");
const router = express.Router();
const replayController = require("../controller/replayController");
const uploadController = require("../controller/uploadController");

router.post("/", replayController.createReplay);
router.post("/upload", uploadController.upload);

module.exports = router;
