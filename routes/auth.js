const express = require("express");
const authController = require("../controllers/auth");
const authControlleroflogin = require("../controllers/authlogin");

const router = express.Router();

router.post("/login-signup", authController.signup);
router.post("/login-signup/login", authControlleroflogin.login);


module.exports = router;
