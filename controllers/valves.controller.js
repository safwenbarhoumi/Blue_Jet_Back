const Valve = require("../models/valves.model");
const ValveSchedule = require("../models/valveSchedule.model");
const User = require("../models/user.model");
const Zone = require("../models/agriculturalZones.model");
const Program = require("../models/program");

const {
  scheduleActivateValve,
  scheduleDesactivateValve,
} = require("../services/agenda/agendaJobs/valves");

exports.getAllValves = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId).populate("farm");
    if (!user || !user.farm) {
      return res.status(404).send({ message: "User not found" });
    }
    const allValves = user.farm[0].zones.flatMap((zone) => zone.valves);
    res.status(200).send(allValves);
  } catch (err) {
    res.status(500).send({ message: err.message || "some error occurred " });
  }
};

exports.updateValve = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await User.findById(userId).populate("farm");
    if (!user || !user.farm) {
      return res.status(404).send({ message: "user not found" });
    }

    const valveId = req.body.id;
    let valveToUpdate;
    console.log("user:", user);
    console.log("user.farm:", user.farm);
    console.log("user.farm[0].zones.valves:", user.farm[0].zones[0].valves);

    const valve = user.farm[0].zones[0].valves.find(
      (valve) => valve._id == valveId
    );

    if (!valve) {
      return res.status(404).send({ message: "valve not found." });
    }
    valve.state = req.body.state;
    await user.farm[0].save();
    res.status(200).send({ message: "Valve state updated successfully." });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.resetValve = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await User.findById(userId).populate("farm");
    if (!user || !user.farm) {
      return res.status(404).send({ message: "User not found" });
    }

    const farm = user.farm[0];
    const zones = farm.zones;

    zones.forEach((zone) => {
      const valves = zone.valves;

      valves.forEach((valve) => {
        valve.state = 0;
      });
    });

    await farm.save();
    return res.status(200).send({ message: "valves reset successfully." });
  } catch (error) {
    res.status(500).send({ message: error.message || "Some error occurred." });
  }
};

exports.createValveSchedule = async (req, res) => {
  try {
    const { valveId, day, timeRanges } = req.body;

    const zoneId = req.body.zoneId;
    const zone = await Zone.findById(zoneId);
    const Valves = zone.valves.find((valves) => valves._id == valveId);
    const userId = req.userId;
    const user = await User.findById(userId).populate("farm");
    if (!user || !user.farm) {
      return res.status(404).send({ message: "User not found" });
    }

    const newValveSchedule = new ValveSchedule({
      valveId,
      day,
      timeRanges,
    });
    const savedValveSchedule = await newValveSchedule.save();

    timeRanges.forEach((timeRange) => {
      scheduleActivateValve(timeRange.open, valveId, zoneId);
      scheduleDesactivateValve(timeRange.close, valveId, zoneId);
    });
    res.status(201).json(savedValveSchedule);
  } catch (error) {
    console.error("Error creating valve schedule:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
// All valve :
exports.createAllValveSchedule = async (req, res) => {
  try {
    const { day, timeRanges, zoneId } = req.body;

    // Find the zone by ID
    const zone = await Zone.findById(zoneId);
    if (!zone) {
      return res.status(404).send({ message: "Zone not found" });
    }

    const userId = req.userId;
    const user = await User.findById(userId).populate("farm");
    if (!user || !user.farm) {
      return res.status(404).send({ message: "User not found" });
    }

    // Iterate over each valve in the zone
    for (const valve of zone.valves) {
      const valveId = valve._id;

      const newValveSchedule = new ValveSchedule({
        valveId,
        day,
        timeRanges,
      });
      const savedValveSchedule = await newValveSchedule.save();

      const newProgram = new Program({
        num_zone: zoneId, // Assuming zoneId is the number zone
        description: `Le valve a été programmé entre ${timeRanges}`,
        date: `Ce program a été créé depuis : ${new Date().toISOString()}`, // Current date and time
        farm: zone.farm[0]._id, // Assuming the zone has a farm reference
      });
      // Save the new program to the database
      await newProgram.save();

      timeRanges.forEach((timeRange) => {
        scheduleActivateValve(timeRange.open, valveId, zoneId);
        scheduleDesactivateValve(timeRange.close, valveId, zoneId);
      });
    }

    res.status(200).send({ message: "Valve schedules created successfully" });
  } catch (error) {
    res.status(500).send({ message: "An error occurred", error });
  }
};

exports.getValveSchedules = async (req, res) => {
  try {
    const { valveId } = req.body;

    const valve = await Valve.findById(valveId);
    if (!valve) {
      return res.status(404).json({ error: "Valve not found" });
    }

    const valveSchedules = await ValveSchedule.find({ valveId }).exec();

    res.status(200).json(valveSchedules);
  } catch (error) {
    console.error("Error getting valve schedules:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.updateValveSchedule = async (req, res) => {
  try {
    const { valveId, scheduleId, day, timeRanges } = req.body;

    // Validate input here if needed

    const valve = await Valve.findById(valveId);
    if (!valve) {
      return res.status(404).json({ error: "Valve not found" });
    }

    const valveSchedule = await ValveSchedule.findById(scheduleId);
    if (!valveSchedule) {
      return res.status(404).json({ error: "Valve schedule not found" });
    }

    valveSchedule.day = day;
    valveSchedule.timeRanges = timeRanges;

    const updatedValveSchedule = await valveSchedule.save();

    res.status(200).json(updatedValveSchedule);
  } catch (error) {
    console.error("Error updating valve schedule:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
