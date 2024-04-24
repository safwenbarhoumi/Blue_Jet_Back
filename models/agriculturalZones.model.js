const mongoose = require("mongoose");
const Sensor = require("./sensors.model");
const Valve = require("./valves.model");
const Well = require("./wells.model");
const Pumps = require("./pumps.model");

const zoneSchema = new mongoose.Schema({
  localisation_zone: {
    latitude: { type: Number },
    longitude: { type: Number },
  },
  sensors: [Sensor.schema],
  valves: [Valve.schema],
  wells: [Well.schema],
  pumps: [Pumps.schema],
  farm: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Farm",
    },
  ],
});

module.exports = mongoose.model("Zone", zoneSchema);
