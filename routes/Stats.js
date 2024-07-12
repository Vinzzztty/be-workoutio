const express = require("express");
const router = express.Router();
const statsController = require("../controller/statsController");

router.post("/", statsController.createStats);
router.get("/", statsController.getStats);
router.put("/", statsController.updateStats);

module.exports = router;
