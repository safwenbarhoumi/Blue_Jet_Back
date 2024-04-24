const mongoose = require("mongoose");

const sensorsSchema = new mongoose.Schema(
  {
    type: {
      type: String, // ph - temperature ....
    },
    mesure: {
      type: Number,
    },
    electricityState: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Sensors", sensorsSchema);
