const express = require("express");
const router = express.Router();
const { SignUp, loginUser } = require("../controllers/UserController");
router.post("/Signup", SignUp);
router.post("/Login", loginUser);

module.exports = router;
