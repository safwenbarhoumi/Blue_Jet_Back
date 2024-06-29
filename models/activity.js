const mongoose = require("mongoose");
const activitySchema = new mongoose.Schema({
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
module.exports = mongoose.model("Activity", activitySchema);
