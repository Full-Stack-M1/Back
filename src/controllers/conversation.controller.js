const Conversation = require("../models/conversation.model");

module.exports = {
  createConversation: async (req, res) => {
    const { name, type, tag } = req.body;
    const createdBy = req.user.id;
    try {
      const conversation = await Conversation.create({
        name,
        type,
        tag,
        createdBy,
      });
      res.status(201).json({
        conversation,
        success: true,
      });
    } catch (error) {
      console.error("Error creating conversation:", error);
      res.status(500).json({
        message: "Internal server error",
        success: false,
      });
    }
  },

  getConversationById: async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;
    try {
      const conversation = await Conversation.findById(id)
        .populate({
          path: "messages",
          populate: { path: "user" },
        })
        .populate("createdBy");
      if (conversation.createdBy._id.toString() !== userId) {
        return res.status(403).json({
          message: "You are not allowed to access this conversation",
          success: false,
        });
      }

      if (conversation) {
        res.status(200).json({
          conversation,
          success: true,
        });
      } else {
        res.status(404).json({
          message: "Conversation not found",
          success: false,
        });
      }
    } catch (error) {
      console.error("Error fetching conversation:", error);
      res.status(500).json({
        message: "Internal server error",
        success: false,
      });
    }
  },

  getconversationsBySearchParam: async (req, res) => {
    const { name, type, tag } = req.body;

    try {
      let searchCriteria = {
        name: { $regex: new RegExp(name, "i") },
      };

      if (type && type.length > 0) {
        if (Array.isArray(type)) {
          searchCriteria.type = { $in: type.map((t) => t.toUpperCase()) };
        } else {
          searchCriteria.type = type.toUpperCase();
        }
      }

      if (tag && tag.length > 0) {
        if (Array.isArray(tag)) {
          searchCriteria.tag = { $in: tag.map((t) => t.toUpperCase()) };
        } else {
          searchCriteria.tag = tag.toUpperCase();
        }
      }

      const conversations = await Conversation.find(searchCriteria)
        .populate({
          path: "messages",
          populate: { path: "user" },
        })
        .populate("createdBy");

      if (conversations.length === 0) {
        return res.status(404).json({
          message: "No conversation where found with this name",
          success: false,
        });
      }
      res.status(200).json({
        conversations: conversations,
        success: true,
      });
    } catch (error) {
      console.error("Error fetching conversations:", error);
      res.status(500).json({
        message: "Internal server error",
        success: false,
      });
    }
  },

  getAllConversations: async (req, res) => {
    try {
      const conversations = await Conversation.find()
        .populate({
          path: "messages",
          populate: { path: "user" },
        })
        .populate("createdBy");
      res.status(200).json({
        conversations,
        success: true,
      });
    } catch (error) {
      console.error("Error fetching conversations:", error);
      res.status(500).json({
        message: "Internal server error",
        success: false,
      });
    }
  },

  updateConversation: async (req, res) => {
    const { id } = req.params;
    const { name, type, tag } = req.body;
    const userId = req.user.id;
    try {
      const updatedConversation = await Conversation.findByIdAndUpdate(
        id,
        { name, type, tag },
        { new: true }
      );
      if (updatedConversation.createdBy.toString() !== userId) {
        return res.status(403).json({
          message: "You are not allowed to update this conversation",
          success: false,
        });
      }
      if (updatedConversation) {
        res.status(200).json({
          conversation: updatedConversation,
          success: true,
        });
      } else {
        res.status(404).json({
          message: "Conversation not found",
          success: false,
        });
      }
    } catch (error) {
      console.error("Error updating conversation:", error);
      res.status(500).json({
        message: "Internal server error",
        success: false,
      });
    }
  },

  deleteConversation: async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;
    try {
      const deletedConversation = await Conversation.findByIdAndDelete(id);
      if (deletedConversation.createdBy.toString() !== userId) {
        return res.status(403).json({
          message: "You are not allowed to delete this conversation",
          success: false,
        });
      }
      if (deletedConversation) {
        res.status(200).json({
          message: "Conversation deleted successfully",
          success: true,
        });
      } else {
        res.status(404).json({
          message: "Conversation not found",
          success: false,
        });
      }
    } catch (error) {
      console.error("Error deleting conversation:", error);
      res.status(500).json({
        message: "Internal server error",
        success: false,
      });
    }
  },
};
