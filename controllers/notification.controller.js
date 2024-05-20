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

/* exports.getnottifications = async (req, res) => {
  try {
    const notifications = await Notification.findById(req.params.id).populate(
      "farm"
    );
    if (!notifications) {
      return res.status(404).send({ message: "Notifications not found" });
    }
    res.send(notifications);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}; */
