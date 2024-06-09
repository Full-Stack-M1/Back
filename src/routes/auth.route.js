const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getMe,
} = require("../controllers/auth.controller");
const isAuth = require("../middlewares/isAuth");

router.post("/register", registerUser);
router.get("/me", isAuth, getMe);
router.post("/login", loginUser);

module.exports = router;
