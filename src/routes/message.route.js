const express = require("express");
const router = express.Router();
const { createMessage } = require("../controllers/message.controller");
const isAuth = require("../middlewares/isAuth");

router.post("/:id", isAuth, createMessage);

module.exports = router;
