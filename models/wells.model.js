const mongoose = require("mongoose");

const wellSchema = new mongoose.Schema({
  namewell: {
    type: String,
  },
  state: {
    type: Number,
    required: true,
  },
  electricityState: {
    type: Number,
    required: true,
  },
  hardwareState: {
    type: Number,
    required: true,
  },
  allWater: {
    type: Number,
    required: true,
  },
  usedWater: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Well", wellSchema);
