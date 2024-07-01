const mongoose = require("mongoose");
const programSchema = new mongoose.Schema({
  num_zone: {
    type: String,
  },
  description: {
    type: String,
  },
  date: {
    type: String,
  },
  farm: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Farm",
  },
});
module.exports = mongoose.model("Program", programSchema);
