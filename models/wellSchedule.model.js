const mongoose = require("mongoose");
const path = require("path");
const wellscheduleModelPath = path.resolve(
  __dirname,
  "../models/wellSchedule.model"
);
const wellscheduleModel = require(wellscheduleModelPath);

const timeRangeSchema = new mongoose.Schema({
  open: { type: String, required: true },
  close: { type: String, required: true },
});

const wellscheduleschema = new mongoose.Schema({
  wellId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Well",
    required: true,
  },
  day: {
    type: String,
    enum: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    required: true,
  },
  timeRanges: [timeRangeSchema],
});
module.exports = mongoose.model("wellSchedule", wellscheduleschema);
