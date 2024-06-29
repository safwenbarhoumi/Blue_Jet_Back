const mongoose = require("mongoose");
const Activity = require("../models/activity");

// Function to get activities by farm ID
exports.getActivityByFarmId = async (req, res) => {
  try {
    const farmId = req.params.farmId;
    console.log("the farm Id :  ", farmId);

    // Find activities with the given farm ID
    const activities = await Activity.find({ farm: farmId });
    console.log("the activities :  ", activities);

    if (activities.length === 0) {
      return res
        .status(404)
        .send({ message: "No activities found for this farm ID" });
    }

    res.status(200).send(activities);
  } catch (err) {
    res.status(500).send({ message: err.message || "Some error occurred." });
  }
};
