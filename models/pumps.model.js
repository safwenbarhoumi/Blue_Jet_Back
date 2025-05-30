const mongoose = require("mongoose");

const pumpSchema = new mongoose.Schema({
  namePump: {
    type: String,
  },
  state: {
    type: Number,
  },
  hardwareState: {
    type: Number,
  },
  electricityState: {
    type: Number,
  },
});
module.exports = mongoose.model("Pump", pumpSchema);
