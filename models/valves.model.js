const mongoose = require("mongoose");

const valvesSchema = new mongoose.Schema({
  nameValve: {
    type: String,
  },
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
