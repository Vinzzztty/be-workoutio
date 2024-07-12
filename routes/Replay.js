const express = require("express");
const router = express.Router();
const multer = require("multer");
const replayController = require("../controller/replayController");
const uploadController = require("../controller/uploadController");

const upload = multer({ dest: "tmp/" });

router.post("/", replayController.createReplay);
router.post("/upload", upload.single("file"), uploadController.upload);
// router.get('/', replayController.getReplays);

module.exports = router;
