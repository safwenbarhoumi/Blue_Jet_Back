const wellschedule = require("../models/wellschedule.model");

exports.createWellSchedule = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId).populate("farm");
    if (!user || !user.farm) {
      return res.status(404).send({ message: "User not found." });
    }
    const wellId = req.body.id;
    const wellschedule = req.body.wellschedule;

    const well = user.farm[0].wells.find((wells) => wells._id == wellId);
    if (!well) {
      return res.status(404).send({ message: "well not found." });
    }
    well.schedule = wellschedule;
    await user.farm[0].save();
    res.status(200).send({ message: "well Schedule updated successfully." });
  } catch (err) {
    res.status(500).send({ message: err.message || "Some error occurred." });
  }
};
