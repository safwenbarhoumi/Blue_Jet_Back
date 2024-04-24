const mongoose = require("mongoose");
const Well = require("./wells.model");
const Pumps = require("./pumps.model");
const Zone = require("./agriculturalZones.model");
const Steg = require("./steg.model");

const farmSchema = new mongoose.Schema({
  localisation_farm: {
    latitude: { type: Number },
    longitude: { type: Number },
  },
  region: { type: String },
  culture: { type: String },
  alarm: { type: String },
  wells: [Well.schema],
  pumps: [Pumps.schema],
  zones: [Zone.schema],
  steg: [Steg.schema],
});

const Farm = mongoose.model("Farm", farmSchema);
module.exports = Farm;
