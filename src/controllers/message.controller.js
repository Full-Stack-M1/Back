const Message = require("../models/message.model");
const User = require("../models/user.model");
const Conversation = require("../models/conversation.model");

module.exports = {
  createMessage: async (req, res) => {
    const content = req.body.content;
    const conversationId = req.params.id;
    const userId = req.user.id;
    try {
      // récupérer l'utilisateur et la conversation
      const user = await User.findById(userId);
      const conversation = await Conversation.findById(conversationId);
      if (!conversation) {
        return res.status(404).json({
          message: "Conversation not found",
          success: false,
        });
      }

      // Créer le message
      const message = await Message.create({ content, user });

      // Ajouter le message à la conversation
      conversation.messages.push(message);
      await conversation.save();

      res.status(201).json({
        message,
        success: true,
      });
    } catch (error) {
      console.error("Error creating message:", error);
      res.status(500).json({
        message: "Internal server error",
        success: false,
      });
    }
  },
};
