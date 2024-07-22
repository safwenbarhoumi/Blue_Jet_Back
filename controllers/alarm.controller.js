const Alarm = require("../models/alarm.model");
const User = require("../models/user.model");
const Notification = require("../models/notification.model");
const { io } = require("../server"); // Import io instance
const Farm = require("../models/Farm.model");
const AlarmSchedule = require("../models/alarmSchedule.model");
const Program = require("../models/program");

const {
  scheduleActivateAlarm,
  scheduleDeactivateAlarm,
} = require("../services/agenda/agendaJobs/alarme");

exports.getAlarmByFarmId = async (req, res) => {
  try {
    const farmId = req.params.farmId;
    const farm = await Farm.findById(farmId);
    if (!farm) {
      return res.status(404).send({ message: "Farm not found" });
    }

    const currentAlarmState = farm.alarm;

    // Send the current alarm state as the response
    res.status(200).send({ alarmState: currentAlarmState });
  } catch (error) {
    // Handle errors
    res.status(500).send({ message: error.message || "Some error occurred." });
  }
};

exports.updateAlarm = async (req, res) => {
  try {
    // Extract the farm ID from the request parameters and the new alarm state from the request body
    const farmId = req.params.farmId;
    const alarmState = req.body.state;

    // Fetch the farm document from the database
    const farm = await Farm.findById(farmId);

    // Check if the farm exists
    if (!farm) {
      return res.status(404).send({ message: "Farm not found" });
    }

    // Get the current alarm state
    const currentAlarmState = farm.alarm;

    // Check if the new alarm state is different from the current one
    if (currentAlarmState === alarmState) {
      return res.send({
        message: "The alarm state is already set to this state",
      });
    } else {
      // Update the alarm state
      farm.alarm = alarmState;
      await farm.save();

      // Create a new notification
      const currentDate = new Date().toISOString();
      const newNotification = new Notification({
        title: `The alarm has been changed from ${currentAlarmState} to ${alarmState}.`,
        date: currentDate,
        farm: farm._id,
      });

      // Save the notification
      await newNotification.save();

      // Send a success response
      res.status(200).send({ message: "Alarm updated successfully" });
    }
  } catch (error) {
    // Handle errors
    res.status(500).send({ message: error.message || "Some error occurred." });
  }
};

const moment = require("moment-timezone");

exports.createAlarmSchedule = async (req, res) => {
  const farmId = req.params.farmId;
  const { day, timeRanges } = req.body;

  try {
    const farm = await Farm.findById(farmId);
    if (!farm) {
      return res.status(404).send({ message: "Farm not found" });
    }

    const newAlarmSchedule = new AlarmSchedule({ farmId, day, timeRanges });
    const savedAlarmSchedule = await newAlarmSchedule.save();
    //console.log("farm id ===== ", farmId);
    //console.log("savedAlarmSchedule ===== ", savedAlarmSchedule);
    //console.log("day ====== ", day);
    //console.log("timeRanges ====== ", timeRanges);

    timeRanges.forEach((timeRange) => {
      scheduleActivateAlarm(timeRange.start, farmId);
      scheduleDeactivateAlarm(timeRange.end, farmId);
    });

    const newProgram = new Program({
      num_farm: farmId, // Assuming farmId is the number farm
      description: `The alarm has been scheduled between ${timeRanges
        .map((tr) => `${tr.start} and ${tr.end}`)
        .join(", ")}`,
      date: `This program was created on: ${new Date().toISOString()}`, // Current date and time
      farm: farm._id, // Reference to the farm
    });
    await newProgram.save();

    res.status(201).json(savedAlarmSchedule);
  } catch (error) {
    console.error("Error creating alarm schedule:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
