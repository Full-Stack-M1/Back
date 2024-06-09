const ConversationTag = ["NEW", "ACTIVE", "ARCHIVED"];
const ConversationType = [
  //Général
  "BLOC",
  "DIFFICULTÉ",
  "EXTÉRIEUR",
  "INTÉRIEUR",
  //Intérieur
  "CLIMB UP",
  "ARKOSE",
  "ALTISSIMO",
  "BLOCK OUT",
  "HAPIK",
  "VERTICAL'ART",
  "CLIMB DISTRICT",
  "ANTREBLOC",
  "THE ROOF",
  "BLOCBUSTER",
  "HARDBLOC",
  "ESPACE VERTICAL",
  "MURMUR",
  "O'BLOC",
  //Extérieur
  "FONTAINEBLEAU",
  "CÉÜSE",
  "BUOUX",
  "GORGE DU VERDON",
  "SAINT LÉGER DU VENTOUX",
  "LES DENTELLES DE MONTMIRAIL",
  "ORPIERRE",
  "AILEFROIDE",
  "LA TURBIE",
  "ANNOT",
  "RUSSAN",
  "CLARET",
  "CHATEAUVERT",
  "OMBLEZE",
  "GORGE DU TARN",
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
    type: String,
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
