const express = require("express");
const router = express.Router();
const authRouter = require("./auth.route");
const conversationRouter = require("./conversation.route");
const messageRouter = require("./message.route");

router.use("/auth", authRouter);
router.use("/conversation", conversationRouter);
router.use("/message", messageRouter);

module.exports = router;
