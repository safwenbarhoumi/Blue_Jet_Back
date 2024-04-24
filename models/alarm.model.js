const mongoose = require("mongoose");
const alarmeSchema = new mongoose.Schema({
  state: {
    type: String,
  },
  farm: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Farm",
  },
});
module.exports = mongoose.model("Alarm", alarmeSchema);
