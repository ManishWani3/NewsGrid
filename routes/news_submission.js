const express = require("express");

const subController = require("../controllers/news_submission");

const router = express.Router();

router.post("/news-submission", subController.submitdata);

module.exports = router;