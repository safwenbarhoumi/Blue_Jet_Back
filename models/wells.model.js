const mongoose = require("mongoose");

const wellSchema = new mongoose.Schema({
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
});

module.exports = mongoose.model("Well", wellSchema);

