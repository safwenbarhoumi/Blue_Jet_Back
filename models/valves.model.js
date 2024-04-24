const mongoose = require("mongoose");

const valvesSchema = new mongoose.Schema({
  state: {
    type: Number,
  },
  electricityState: {
    type: Number,
  },
  hardwareState: {
    type: Number,
  },
  batteryLevel: {
    type: Number,
  },
});
module.exports = mongoose.model("Valves", valvesSchema);
