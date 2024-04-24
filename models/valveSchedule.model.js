const mongoose = require("mongoose");


const timeRangeSchema = new mongoose.Schema({
  open: { type: String, required: true },
  close: { type: String, required: true },
});

const valveScheduleSchema = new mongoose.Schema({
  valveId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Valves', 
    required: true,
  },
  day: {
    type: String,
    enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    required: true,
  },
  timeRanges: [timeRangeSchema],
});
module.exports = mongoose.model("ValveSchedule", valveScheduleSchema);


