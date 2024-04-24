const mongoose = require("mongoose");
const notificationSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  date: {
    type: String,
  },
  farm: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Farm",
    },
  ],
});

module.exports = mongoose.model("Notification", notificationSchema);
