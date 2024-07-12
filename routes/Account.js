const express = require("express");
const router = express.Router();
const accountController = require("../controller/accountController");

router.post("/", accountController.createAccount);
router.get("/", accountController.getAccounts);
router.post("/login", accountController.login);

module.exports = router;
