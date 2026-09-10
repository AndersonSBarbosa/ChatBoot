
const express = require("express");
const promptController = require("../controllers/prompt-controller");
const router = express.Router();

router.post("/api/prompt", promptController.sendText);

module.exports = router;