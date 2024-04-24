const capteurs = require("../models/sensors.model");
const User = require("../models/user.model");

exports.getSensors = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await User.findById(userId).populate("farm");

    if (!user || !user.farm) {
      return res.status(404).send({ message: "User not found" });
    }
    const capteurs = user.farm[0].zones[0].sensors;
    res.status(200).send(capteurs);
  } catch (err) {
    res.status(500).send({ message: err.message || "Some error occurred" });
  }
};
