//const Map = require("../models/maps.model");
const Farm = require("../models/Farm.model");
const User = require("../models/user.model");

// Added !
exports.getFermLocalization = async (req, res) => {
  try {
    const { fermId } = req.params;

    const ferm = await Farm.findById(fermId);
    if (!ferm) {
      return res.status(404).json({ message: "Ferm not found" });
    }

    const fermLocalization = ferm.localisation_farm;
    res.status(200).json({ localization: fermLocalization });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error." });
  }
};

// Added !
exports.getZoneLocalization = async (req, res) => {
  try {
    const { mapId } = req.params;

    const map = await Map.findById(mapId);
    if (!map) {
      return res.status(404).json({ message: "Map not found" });
    }
    const agricultureZoneLocalization = map.localisation_zone;
    res.status(200).json({ localization: agricultureZoneLocalization });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

exports.getLocalisation = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await User.findById(userId).populate("farm");
    if (!user || !user.farm) {
      return res.status(404).send({ message: "User not found" });
    }

    const localisation = user.farm[0].localisation_farm;
    res.status(200).send(localisation);
  } catch (err) {
    res.status(500).send({ message: err.message || "some error occurred " });
  }
};
