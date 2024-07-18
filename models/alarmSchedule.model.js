const mongoose = require("mongoose");

const timeRangeSchema = new mongoose.Schema({
  start: { type: String, required: true },
  end: { type: String, required: true },
});

const AlarmScheduleSchema = new mongoose.Schema({
  /*  alarmId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Alarm",
    required: true,
  }, */
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

module.exports = mongoose.model("AlarmSchedule", AlarmScheduleSchema);
