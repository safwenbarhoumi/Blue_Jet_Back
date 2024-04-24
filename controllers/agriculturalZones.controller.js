const User = require("../models/user.model");
const Zone = require("../models/agriculturalZones.model");
const Pump = require("../models/pumps.model");
exports.getZoneDetails = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId).populate("farm");
    if (!user || !user.farm) {
      return res.status(404).send({ message: "User not found" });
    }
    const zoneDetaills = user.farm[0].zones;
    res.status(200).send(zoneDetaills);
  } catch (err) {
    res.status(500).send({ message: "some error occurred else where " });
  }
};

exports.getPumpsById = async (req, res) => {
  try {
    const zoneId = req.params.id;
    const zone = await Zone.findById(zoneId);
    if (!zone) {
      return res.status(404).send({ message: "Zone not found" });
    }
    const pumps = zone.pumps;
    res.status(200).send(pumps);
  } catch (err) {
    res.status(500).send({ message: err.message || "Some error occurred." });
  }
};

exports.updatePumpById = async (req, res) => {
  try {
    const zoneId = req.params.id;
    const electricity_State = req.body.electricity_State;

    // Find the zone
    const zone = await Zone.findById(zoneId);
    if (!zone) {
      return res.status(404).send({ message: "Zone not found" });
    }

    // Update the electricity_State of the pump in the zone
    if (!zone.pumps || zone.pumps.length === 0) {
      return res.status(404).send({ message: "No pump found in the zone" });
    }
    // Assuming there is only one pump in the zone
    zone.pumps[0].electricityState = electricity_State;

    // Save the updated zone
    await zone.save();

    res.status(200).send({ message: "Pump updated successfully" });
  } catch (err) {
    res.status(500).send({ message: err.message || "Some error occurred." });
  }
};

exports.getWellById = async (req, res) => {
  try {
    const zoneId = req.params.id;
    const zone = await Zone.findById(zoneId);
    if (!zone) {
      return res.status(404).send({ message: "Zone not found" });
    }
    const wells = zone.wells;
    res.status(200).send(wells);
  } catch (err) {
    res.status(500).send({ message: err.message || "Some error occurred." });
  }
};

exports.updateWellById = async (req, res) => {
  try {
    const zoneId = req.params.id;
    const electricity_State = req.body.electricity_State;

    // Find the zone
    const zone = await Zone.findById(zoneId);
    if (!zone) {
      return res.status(404).send({ message: "Zone not found" });
    }

    if (!zone.wells || zone.wells.length === 0) {
      return res.status(404).send({ message: "No well found in the zone" });
    }
    // Assuming there is only one well in the zone
    zone.wells[0].electricityState = electricity_State;

    // Save the updated zone
    await zone.save();

    res.status(200).send({ message: "Well updated successfully" });
  } catch (err) {
    res.status(500).send({ message: err.message || "Some error occurred." });
  }
};

exports.getAllValvesByZoneId = async (req, res) => {
  try {
    const zoneId = req.params.id;
    const zone = await Zone.findById(zoneId);
    if (!zone) {
      return res.status(404).send({ message: "Zone not found" });
    }
    const valves = zone.valves;
    res.status(200).send(valves);
  } catch (err) {
    res.status(500).send({ message: err.message || "Some error occurred." });
  }
};

exports.updateValveById = async (req, res) => {
  try {
    const zoneId = req.params.zoneId;
    const valveId = req.params.valveId;
    const electricity_State = req.body.electricity_State;

    // Find the zone
    const zone = await Zone.findById(zoneId);
    if (!zone) {
      return res.status(404).send({ message: "Zone not found" });
    }

    // Find the valve in the zone
    const valve = zone.valves.id(valveId);
    if (!valve) {
      return res.status(404).send({ message: "Valve not found in the zone" });
    }

    // Update the electricityState of the valve
    valve.electricityState = electricity_State;

    // Save the updated zone
    await zone.save();

    res.status(200).send({ message: "Valve updated successfully" });
  } catch (err) {
    res.status(500).send({ message: err.message || "Some error occurred." });
  }
};

exports.getLocations = async (req, res) => {
  try {
    const zones = await Zone.find({}, "localisation_zone");
    res.status(200).send(zones.map((zone) => zone.localisation_zone));
  } catch (err) {
    res.status(500).send({ message: err.message || "Some error occurred." });
  }
};
