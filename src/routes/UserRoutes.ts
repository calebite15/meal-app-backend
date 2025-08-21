const express = require("express");
const { Signup, LoginUser } = require("../controllers/Usercontroller");
const router = express.Router();

router.post("/Signup", Signup);
router.post("/Login", LoginUser);

module.exports = router;
