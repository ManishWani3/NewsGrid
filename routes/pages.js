const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("login-signup.hbs");
});

router.get("/home", (req, res) => {
  res.render("index.hbs");
});

router.get("/about", (req, res) => {
  res.render("about.hbs");
});

router.get("/article", (req, res) => {
  res.render("article.hbs");
});

router.get("/form", (req, res) => {
  res.render("news-submission.hbs");
});





module.exports = router;
