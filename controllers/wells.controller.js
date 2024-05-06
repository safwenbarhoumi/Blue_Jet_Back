const Wells = require("../models/wells.model");
const User = require("../models/user.model");
const WellSchedule = require("../models/wellSchedule.model");
const {
  scheduleActivateWell,
  scheduleDesactivateWell,
} = require("../services/agenda/agendaJobs/wells");

exports.getAllWells = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await User.findById(userId).populate("farm");
    if (!user || !user.farm) {
      return res.status(404).send({ message: "User not found" });
    }
    const well = user.farm[0].wells;
    res.status(200).send(well);
  } catch (err) {
    res.status(500).send({ message: err.message || "some error occurred " });
  }
};

exports.updateWell = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await User.findById(userId).populate("farm");

    if (!user || !user.farm) {
      return res.status(404).send({ message: "User not found." });
    }

    const wellId = req.body.id;
    console.log(wellId);

    const wells = user.farm[0].wells.find((wells) => wells._id == wellId);
    if (!wells) {
      return res.status(404).send({ message: "Well not found." });
    }
    wells.state = req.body.state;

    await user.farm[0].save();

    res.status(200).send({ message: "Well state updated successfully." });
  } catch (err) {
    res.status(500).send({ message: err.message || "Some error occurred." });
  }
};

exports.resetAllWells = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await User.findById(userId).populate("farm");
    if (!user || !user.farm) {
      return res.status(404).send({ message: "User not found " });
    }

    const farm = user.farm[0];

    farm.wells.forEach((element) => {
      element.etat = "fermé";
    });

    await farm.save();
    return res.status(200).send({ message: "wells reset successfully" });
  } catch (error) {
    res.status(500).send({ message: error.message || "some error happened" });
  }
};

exports.createWellSchedule = async (req, res) => {
  // const userId = req.userId;

  try {
    const { wellId, day, timeRanges } = req.body;

    // to Validate input here

    const well = await Wells.findById(wellId);
    if (!well) {
      return res.status(404).json({ error: "Well not found" });
    }

    const newWellSchedule = new WellSchedule({ wellId, day, timeRanges });
    console.log("new", newWellSchedule);
    const savedWellSchedule = await newWellSchedule.save();

    timeRanges.forEach((timeRange) => {
      scheduleActivateWell(timeRange.open, wellId);
      scheduleDesactivateWell(timeRange.close, wellId);
    });

    res.status(201).json(savedWellSchedule);
  } catch (error) {
    console.error("Error creating well schedule:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
