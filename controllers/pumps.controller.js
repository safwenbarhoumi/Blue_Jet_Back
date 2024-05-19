const Pump = require("../models/pumps.model");
const PumpSchedule = require("../models/pumpSchedule.model");
const User = require("../models/user.model");
const Zone = require("../models/agriculturalZones.model");

const {
  scheduleActivatePump,
  scheduleDesactivatePump,
} = require("../services/agenda/agendaJobs/pumps");

exports.getPumps = async (req, res) => {
  console.log("================");
  try {
    const userId = req.userId;

    const user = await User.findById(userId).populate("farm");
    if (!user || !user.farm) {
      return res.status(404).send({ message: "User not found" });
    }
    console.log(user.farm[0].pumps);
    const pumpes = user.farm[0].pumps;

    res.status(200).send(pumpes);
  } catch (err) {
    res.status(500).send({ message: err.message || "some error occurred " });
  }
};

exports.updatePump = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await User.findById(userId).populate("farm");

    if (!user || !user.farm) {
      return res.status(404).send({ message: "User not found." });
    }
    const pumpeId = req.body.id;
    console.log(pumpeId);

    const pumpes = user.farm[0].pumps.find((pumpes) => pumpes._id == pumpeId);
    if (!pumpes) {
      return res.status(404).send({ message: "pump not found." });
    }
    pumpes.state = req.body.state;

    await user.farm[0].save();

    res.status(200).send({ message: "pumpe state updated successfully." });
  } catch (err) {
    res.status(500).send({ message: err.message || "Some error occurred." });
  }
};

exports.resetPump = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await User.findById(userId).populate("farm");
    if (!user || !user.farm) {
      return res.status(404).send({ message: "User not found " });
    }

    const farm = user.farm[0];

    farm.pumps.forEach((element) => {
      element.etat = 0;
    });

    await farm.save();
    return res.status(200).send({ message: "pumpes reset successfully" });
  } catch (error) {
    res.status(500).send({ message: error.message || "some error happened" });
  }
};

// Controller to create schedules for a one specific pump.
exports.createPumpSchedule = async (req, res) => {
  //const userId = req.userId;
  const { pumpId, day, timeRanges } = req.body;

  try {
    // const user = await User.findById(userId).populate("farm");
    // if (!user || !user.farm) {
    //   return res.status(404).send({ message: "User not found." });
    // }

    const zoneId = req.body.zoneId;
    const zone = await Zone.findById(zoneId);
    if (!zone) {
      return res.status(404).send({ message: "Zone not found" });
    }
    const pumpes = zone.pumps.find((pumpes) => pumpes._id == pumpId);
    if (!pumpes) {
      return res.status(404).send({ message: "pump not found." });
    }
    console.log("pumps are :", pumpes);
    const newPumpSchedule = new PumpSchedule({ pumpId, day, timeRanges });
    const savedPumpSchedule = await newPumpSchedule.save();

    timeRanges.forEach((timeRange) => {
      scheduleActivatePump(timeRange.open, pumpId);
      scheduleDesactivatePump(timeRange.close, pumpId);
    });

    res.status(201).json(savedPumpSchedule);
  } catch (error) {
    console.error("Error creating pump schedule:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
// Controller to get all pump schedules for a one specific pump.
exports.getPumpSchedule = async (req, res) => {
  try {
    const { pumpId } = req.body;

    const pump = await Pump.findById(pumpId);
    if (!pump) {
      return res.status(404).json({ error: "Pump not found" });
    }

    const pumpSchedules = await PumpSchedule.find({ pumpId }).exec();

    res.status(200).json(pumpSchedules);
  } catch (error) {
    console.error("Error getting pump schedules:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.updatePumpSchedule = async (req, res) => {
  try {
    const { pumpId, scheduleId, day, timeRanges } = req.body;
    // to Validate input here

    const pump = await Pump.findById(pumpId);
    if (!pump) {
      return res.status(404).json({ error: "Pump not found" });
    }

    const pumpSchedule = await PumpSchedule.findById(scheduleId);
    if (!pumpSchedule) {
      return res.status(404).json({ error: "Pump schedule not found" });
    }

    pumpSchedule.day = day;
    pumpSchedule.timeRanges = timeRanges;

    const updatedPumpSchedule = await pumpSchedule.save();

    res.status(200).json(updatedPumpSchedule);
  } catch (error) {
    console.error("Error updating pump schedule:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
