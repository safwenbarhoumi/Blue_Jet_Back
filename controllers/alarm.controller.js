const Alarm = require("../models/alarm.model");
const User = require("../models/user.model");
const Notification = require("../models/notification.model");
const { io } = require("../server"); // Import io instance

exports.getAlarm = async (req, res) => {
  try {
    /* const { phone } = req.body;

    const user = await User.findOne({ phone: phone }).populate("farm");
    if (!user || !user.farm) {
      return res.status(404).send({ message: "User not found" });
    } */
    const userId = req.userId;
    const user = await User.findById(userId).populate("farm");
    if (!user || !user.farm) {
      return res.status(404).send({ message: "User not found" });
    }
    const alarme = user.farm[0].alarm;
    res.status(200).send(alarme);
  } catch (err) {
    res.status(500).send({ message: "some error occurred else where " });
  }
};

exports.updateAlarm = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId).populate("farm");
    if (!user || !user.farm) {
      return res.status(404).send({ message: "user not found" });
    }
    const alarme1 = user.farm[0].alarm;
    const alarmState = req.body.state;
    if (alarme1 == alarmState) {
      res.send({ message: "the alarme state is already  set to this state" });
      return;
    } else {
      user.farm[0].alarm = alarmState;
      await user.farm[0].save();
      //send notification in the database :
      const currentDate = new Date().toISOString();
      const newNotification = new Notification({
        title: `The Alarme has been changed from ${alarme1} ======> ${alarmState}.`,
        date: currentDate,
        farm: user.farm[0]._id,
      });
      //console.log(farm._id);
      const savedNotification = await newNotification.save();
      res.status(200).send({ message: "alarm updated successfully" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message || "Some error occurred." });
  }
};
