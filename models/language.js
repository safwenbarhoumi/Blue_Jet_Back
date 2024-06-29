const mongoose = require("mongoose");
const languageSchema = new mongoose.Schema({
  type: {
    type: String,
  },
  farm: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Farm",
    },
  ],
});

module.exports = mongoose.model("Language", languageSchema);
