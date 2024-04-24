const mongoose = require('mongoose');

const timeRangeSchema = new mongoose.Schema({
  open: { type: String, required: true },
  close: { type: String, required: true },
});

const PumpScheduleSchema = new mongoose.Schema({
  pumpId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pump', 
    required: true,
  },
  day: {
    type: String,
    enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    required: true,
  },
  timeRanges: [timeRangeSchema],
});

module.exports = mongoose.model('PumpSchedule', PumpScheduleSchema);
