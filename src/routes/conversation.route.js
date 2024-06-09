const express = require("express");
const router = express.Router();
const {
  createConversation,
  deleteConversation,
  getAllConversations,
  getConversationById,
  updateConversation,
} = require("../controllers/conversation.controller");
const isAuth = require("../middlewares/isAuth");

router.post("/", isAuth, createConversation);
router.get("/", isAuth, getAllConversations);
router.get("/:id", isAuth, getConversationById);
router.put("/:id", isAuth, updateConversation);
router.delete("/:id", isAuth, deleteConversation);

module.exports = router;
