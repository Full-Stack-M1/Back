const ConversationTag = ["NEW", "ACTIVE", "ARCHIVED"];
const ConversationType = [
  //Général
  "BLOC",
  "DIFFICULTE",
  "EXTERIEUR",
  "INTERIEUR",
  //Intérieur
  "CLIMBUP",
  "ARKOSE",
  "ALTISSIMO",
  "BLOCKOUT",
  "HAPIK",
  "VERTICALART",
  "CLIMBDISTRICT",
  "ANTREBLOC",
  "THEROOF",
  "BLOCBUSTER",
  "HARDBLOC",
  "ESPACEVERTICAL",
  "MURMUR",
  "OBLOC",
  //Extérieur
  "FONTAINEBLEAU",
  "CEUSE",
  "BUOUX",
  "GORGEDUVERDON",
  "SAINTLÉGERDUVENTOUX",
  "LESDENTELLESDEMONTMIRAIL",
  "ORPIERRE",
  "AILEFROIDE",
  "LATURBIE",
  "ANNOT",
  "RUSSAN",
  "CLARET",
  "CHATEAUVERT",
  "OMBLEZE",
  "GORGEDUTARN",
];

const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  type: {
    type: [String],
    required: true,
    enum: ConversationType,
  },
  tag: {
    type: String,
    required: true,
    enum: ConversationTag,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  messages: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
  ],
});

const Conversation = mongoose.model("Conversation", schema);

module.exports = Conversation;
