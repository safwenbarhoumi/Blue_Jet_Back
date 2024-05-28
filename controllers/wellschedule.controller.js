const wellschedule = require("../models/wellSchedule.model");
const Well = require("../models/wells.model");
const User = require("../models/user.model");
const Zone = require("../models/agriculturalZones.model");

exports.createWellSchedule = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId).populate("farm");
    if (!user || !user.farm) {
      return res.status(404).send({ message: "User not found." });
    }
    const zoneId = req.body.zoneId;
    const wellId = req.body.id;
    const wellschedule = req.body.wellschedule;
    const zone = await Zone.findById(zoneId);
    if (!zone) {
      return res.status(404).send({ message: "Zone not found" });
    }
    const well = zone.pumps.find((w) => w._id == wellId);

    //const well = user.farm[0].wells.find((wells) => wells._id == wellId);
    if (!well) {
      return res.status(404).send({ message: "well not found." });
    }
    well.schedule = wellschedule;
    await user.farm[0].save();
    res.status(201).send({ message: "well Schedule created successfully." });
  } catch (err) {
    res.status(500).send({ message: err.message || "Some error occurred." });
  }
};
