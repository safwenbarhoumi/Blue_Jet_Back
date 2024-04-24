const Notification = require("../models/notification.model");

exports.getnottifications = async (req, res) => {
  try {
    const farmId = req.params.id;
    const notifications = await Notification.find({ farm: farmId });
    res.status(200).send(notifications);
  } catch (err) {
    res.status(500).send({ message: err.message || "some error occurred " });
  }
};
