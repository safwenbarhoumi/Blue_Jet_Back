const mongoose = require("mongoose");

const sensorsSchema = new mongoose.Schema(
  {
    type: {
      type: String,
    },
    mesure: {
      type: Number,
    },
    electricityState: {
      type: Number,
    },
    id_sensor: {
      type: Number,
      require: true,
    },
  }
  //{ timestamps: true }
);

module.exports = mongoose.model("Sensors", sensorsSchema);
