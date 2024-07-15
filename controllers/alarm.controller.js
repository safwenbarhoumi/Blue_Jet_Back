const Alarm = require("../models/alarm.model");
const User = require("../models/user.model");
const Notification = require("../models/notification.model");
const { io } = require("../server"); // Import io instance
const Farm = require("../models/Farm.model");

exports.getAlarmByFarmId = async (req, res) => {
  try {
    // Extract the farm ID from the request parameters
    const farmId = req.params.farmId;

    // Fetch the farm document from the database
    const farm = await Farm.findById(farmId);

    // Check if the farm exists
    if (!farm) {
      return res.status(404).send({ message: "Farm not found" });
    }

    // Get the current alarm state
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

exports.updateAlarmSchedule = async (req, res) => {
  try {
    console.log("Request received to update alarm schedule");

    const farmId = req.params.farmId;
    const { time, days } = req.body;

    console.log("Farm ID:", farmId);
    console.log("New Time:", time);
    console.log("New Days:", days);

    // Parse and validate time with the Tunisia time zone
    const formattedTime = moment.tz(time, "HH:mm", "Africa/Tunis");
    if (!formattedTime.isValid()) {
      return res.status(400).send({ message: "Invalid time format" });
    }

    const farm = await Farm.findById(farmId);

    if (!farm) {
      console.log("Farm not found");
      return res.status(404).send({ message: "Farm not found" });
    }

    const currentAlarmSchedule = farm.alarmSchedule || {};
    console.log("Current Alarm Schedule:", currentAlarmSchedule);

    if (
      currentAlarmSchedule.time === time &&
      JSON.stringify(currentAlarmSchedule.days) === JSON.stringify(days)
    ) {
      console.log("Alarm schedule is already set to this schedule");
      return res.send({
        message: "The alarm schedule is already set to this schedule",
      });
    } else {
      farm.alarmSchedule = { time: formattedTime.format("HH:mm"), days };
      await farm.save();
      console.log("Alarm schedule updated successfully");

      const currentDate = new Date().toISOString();
      const newNotification = new Notification({
        title: `The alarm schedule has been changed to ${time} on days ${days.join(
          ", "
        )}.`,
        date: currentDate,
        farm: farm._id,
      });

      await newNotification.save();
      console.log("Notification saved");

      res.status(200).send({ message: "Alarm schedule updated successfully" });
    }
  } catch (error) {
    console.log("Error occurred:", error);
    res.status(500).send({ message: error.message || "Some error occurred." });
  }
};
