const mongoose = require("mongoose");
const Program = require("../models/program");

// Function to get programs by farm ID
exports.getProgramByFarmId = async (req, res) => {
  try {
    const farmId = req.params.farmId;
    console.log("The farm ID: ", farmId);

    // Find programs with the given farm ID
    const programs = await Program.find({ farm: farmId });
    console.log("The programs: ", programs);

    if (programs.length === 0) {
      return res
        .status(404)
        .send({ message: "No programs found for this farm ID" });
    }

    res.status(200).send(programs);
  } catch (err) {
    res.status(500).send({ message: err.message || "Some error occurred." });
  }
};
