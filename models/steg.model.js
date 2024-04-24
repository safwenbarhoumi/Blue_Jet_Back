const mongoose = require("mongoose");
const stegSchema = new mongoose.Schema({
  active: {
    type: Number,
  },
  automatic_mode: {
    type: Number,
  },
  isAccident: {
    type: Number,
  },
  pump: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pump",
    },
  ],
  sensor: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Sensors",
    },
  ],
  valves: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Valves",
    },
  ],
});
module.exports = mongoose.model("Steg", stegSchema);
