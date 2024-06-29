const User = require("../models/user.model");
const Zone = require("../models/agriculturalZones.model");
const Pump = require("../models/pumps.model");

exports.updateValveNameById = async (req, res) => {
  try {
    const zoneId = req.params.zoneId;
    const valveId = req.params.valveId;
    const nameValve = req.body.nameValve;

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

    // Update the nameValve of the valve
    valve.nameValve = nameValve;

    // Save the updated zone
    await zone.save();

    res.status(200).send({ message: "Valve name updated successfully" });
  } catch (err) {
    res.status(500).send({ message: err.message || "Some error occurred." });
  }
};

exports.getZoneDetails = async (req, res) => {
  try {
    // Fetch all zones
    const zones = await Zone.find({});

    // Check if any zones are found
    if (zones.length === 0) {
      return res.status(404).send({ message: "No zones found" });
    }

    // Return the zones
    res.status(200).send(zones);
  } catch (err) {
    res.status(500).send({ message: "Some error occurred elsewhere" });
  }
};
/* exports.getZoneDetails = async (req, res) => {
  try {
    const farmId = req.params.farmId.toString(); // Convert farmId to string for comparison

    // Fetch all zones
    const zones = await Zone.find({});

    // Check if any zones are found
    if (zones.length === 0) {
      return res.status(404).send({ message: "No zones found" });
    }

    // Initialize an array to store matched zones
    const matchedZones = [];

    // Loop through each zone to find matches with the farm ID
    for (const zone of zones) {
      const farmId2 = zone.farm[0].toString(); // Ensure farm ID is converted to string for comparison
      if (farmId === farmId2) {
        matchedZones.push(zone);
      }
    }

    // Check if any zones are matched
    if (matchedZones.length === 0) {
      return res
        .status(404)
        .send({ message: "No zones found for the specified farm ID" });
    }

    // Return the matched zones
    res.status(200).send(matchedZones);
  } catch (err) {
    res
      .status(500)
      .send({ message: "Some error occurred while fetching zone details" });
  }
}; */
// changes code !
exports.getPumpsById = async (req, res) => {
  try {
    const zoneId = req.params.zoneId;
    const farmId = req.params.farmId;
    const zone = await Zone.findById(zoneId);
    if (!zone) {
      return res.status(404).send({ message: "Zone not found" });
    }
    //console.log("the Zone is", zone);
    //console.log("the id of farm is", zone.farm[0]._id == farmId, !zone.farm);
    if (!(zone.farm && zone.farm[0]._id == farmId)) {
      return res.status(404).send({ message: "zone not found!!" });
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

exports.updateHardwarePumpById = async (req, res) => {
  try {
    const zoneId = req.body.id;
    const hardware_State = req.body.hardware_State;

    // Find the zone
    const zone = await Zone.findById(zoneId);
    if (!zone) {
      return res.status(404).send({ message: "Zone not found" });
    }

    // Update the hardware_State of the pump in the zone
    if (!zone.pumps || zone.pumps.length === 0) {
      return res.status(404).send({ message: "No pump found in the zone" });
    }
    // Assuming there is only one pump in the zone
    zone.pumps[0].hardwareState = hardware_State;

    // Save the updated zone
    await zone.save();

    res.status(200).send({ message: "success" });
  } catch (err) {
    res.status(500).send({ message: err.message || "Some error occurred." });
  }
};

exports.statePumpByZoneId = async (req, res) => {
  try {
    const zoneId = req.body.id;
    //const electricity_State = req.body.electricity_State;

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
    //zone.pumps[0].electricityState = electricity_State;

    // Save the updated zone
    await zone.save();

    res.status(200).send({ etat: `${zone.pumps[0].electricityState}` });
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
    //const electricity_State = req.body.electricity_State;

    // Find the zone
    const zone = await Zone.findById(zoneId);
    if (!zone) {
      return res.status(404).send({ message: "Zone not found" });
    }

    if (!zone.wells || zone.wells.length === 0) {
      return res.status(404).send({ message: "No well found in the zone" });
    }
    // Assuming there is only one well in the zone
    zone.wells[0].electricityState = !zone.wells[0].electricityState;

    // Save the updated zone
    await zone.save();

    res.status(200).send({ etat: `${zone.wells[0].electricityState}` });
  } catch (err) {
    res.status(500).send({ message: err.message || "Some error occurred." });
  }
};

exports.updatHardwareWellById = async (req, res) => {
  try {
    const zoneId = req.body.id;
    const hardware_State = req.body.hardware_State;

    // Find the zone
    const zone = await Zone.findById(zoneId);
    if (!zone) {
      return res.status(404).send({ message: "Zone not found" });
    }

    if (!zone.wells || zone.wells.length === 0) {
      return res.status(404).send({ message: "No well found in the zone" });
    }
    // Assuming there is only one well in the zone
    zone.wells[0].hardwareState = hardware_State;

    // Save the updated zone
    await zone.save();

    res.status(200).send({ message: "succes" });
  } catch (err) {
    res.status(500).send({ message: err.message || "Some error occurred." });
  }
};

exports.stateWellById = async (req, res) => {
  try {
    const zoneId = req.body.id;
    //const electricity_State = req.body.electricity_State;

    // Find the zone
    const zone = await Zone.findById(zoneId);
    if (!zone) {
      return res.status(404).send({ message: "Zone not found" });
    }

    if (!zone.wells || zone.wells.length === 0) {
      return res.status(404).send({ message: "No well found in the zone" });
    }
    // Assuming there is only one well in the zone
    //zone.wells[0].electricityState = !zone.wells[0].electricityState;

    // Save the updated zone
    await zone.save();

    res.status(200).send({ etat: `${zone.wells[0].electricityState}` });
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

//Hardware steg :
exports.updateStateSTEGByZoneId = async (req, res) => {
  try {
    const zoneId = req.body.zoneId;
    const newState = req.body.stateSteg;

    // Find the zone
    const zone = await Zone.findById(zoneId);
    if (!zone) {
      return res.status(404).send({ message: "Zone not found" });
    }

    // Update State of all pumps in the zone
    zone.pumps.forEach((pump) => {
      pump.state = newState;
    });

    // Update State of all valves in the zone
    zone.valves.forEach((valve) => {
      valve.state = newState;
    });

    // Update State of all wells in the zone
    zone.wells.forEach((well) => {
      well.state = newState;
    });

    // Save the updated zone
    //await zone.save();
    const savedZone = await zone.save();
    console.log("Saved zone: ", savedZone);

    res.status(200).send({ message: `sucess` });
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).send({ message: err.message || "Some error occurred." });
  }
};

exports.updateHardwareValveById = async (req, res) => {
  try {
    const zoneId = req.body.zoneId;
    const valveId = req.body.valveId;
    const hardware_State = req.body.hardware_State;

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
    valve.hardwareState = hardware_State;
    // Save the updated zone
    await zone.save();

    res.status(200).send({ message: "success" });
  } catch (err) {
    res.status(500).send({ message: err.message || "Some error occurred." });
  }
};

exports.stateValveById = async (req, res) => {
  try {
    const zoneId = req.body.zoneId;
    console.log("zone id is  : ", zoneId);
    const valveId = req.body.valveId;
    //const electricity_State = req.body.electricity_State;

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
    const etat = valve.electricityState; // = electricity_State;

    // Save the updated zone
    await zone.save();

    res.status(200).send({ etat: `${etat}` });
  } catch (err) {
    res.status(500).send({ message: err.message || "Some error occurred." });
  }
};

exports.updateAllValvesByZoneId = async (req, res) => {
  try {
    const zoneId = req.params.id;
    const electricity_State = req.body.electricity_State;

    // Find the zone
    const zone = await Zone.findById(zoneId);
    if (!zone) {
      return res.status(404).send({ message: "Zone not found" });
    }

    // Update electricityState of all valves in the zone
    zone.valves.forEach((valve) => {
      valve.electricityState = electricity_State;
    });

    // Save the updated zone
    await zone.save();

    res
      .status(200)
      .send({ message: "All valves in the zone updated successfully" });
  } catch (err) {
    res.status(500).send({ message: err.message || "Some error occurred." });
  }
};

/* exports.getLocations = async (req, res) => {
  try {
    const zones = await Zone.find({}, "localisation_zone");
    res.status(200).send(zones.map((zone) => zone.localisation_zone));
  } catch (err) {
    res.status(500).send({ message: err.message || "Some error occurred." });
  }
}; */
exports.getLocations = async (req, res) => {
  try {
    const farmId = req.params.farmId;

    // Ensure farmId is an ObjectId
    const zones = await Zone.find({ farm: farmId }, "localisation_zone");

    if (zones.length === 0) {
      return res
        .status(404)
        .send({ message: "No zones found for the specified farm ID" });
    }

    res.status(200).send(zones.map((zone) => zone.localisation_zone));
  } catch (err) {
    res.status(500).send({ message: err.message || "Some error occurred." });
  }
};

exports.getSensorsByZoneId = async (req, res) => {
  try {
    const zoneId = req.params.zoneId;
    const sensorId = req.params.sensorId;
    console.log("sensorId : ", sensorId);

    const zone = await Zone.findById(zoneId);
    if (!zone) {
      return res.status(404).send({ message: "Zone not found" });
    }

    // Filter sensors by sensorId
    const matchedSensor = zone.sensors.find(
      (sensor) => sensor.id_sensor === parseInt(sensorId)
    );
    console.log("matchedSensor : ", matchedSensor);

    if (!matchedSensor) {
      return res
        .status(404)
        .send({ message: "Sensor not found in the specified zone" });
    }

    res.status(200).send(matchedSensor);
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).send({ message: err.message || "Some error occurred." });
  }
};

//hardware sensors :
exports.updateMesureByZoneId = async (req, res) => {
  try {
    //const { zoneId, sensorId } = req.params;
    const zoneId = req.body.zoneId;
    const sensorId = req.body.sensorId;
    const valeur = req.body.valeur;

    const zone = await Zone.findById(zoneId);
    if (!zone) {
      return res.status(404).send({ message: "Zone not found" });
    }

    // Find the sensor by id_sensor
    const matchedSensor = zone.sensors.find(
      (sensor) => sensor.id_sensor === parseInt(sensorId)
    );

    if (!matchedSensor) {
      return res
        .status(404)
        .send({ message: "Sensor not found in the specified zone" });
    }

    // Update the mesure field
    matchedSensor.mesure = valeur;

    // Save the updated zone document
    await zone.save();

    res.status(200).send({
      message: "success",
    });
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).send({ message: err.message || "Some error occurred." });
  }
};

exports.resetAll = async (req, res) => {
  try {
    // Fetch all zones
    const zones = await Zone.find({});

    // Iterate through each zone and reset pumps, valves, and wells
    for (let zone of zones) {
      if (zone.pumps && zone.pumps.length > 0) {
        zone.pumps.forEach((pump) => {
          pump.electricityState = 0;
          pump.hardwareState = 0;
        });
      }

      if (zone.valves && zone.valves.length > 0) {
        zone.valves.forEach((valve) => {
          valve.electricityState = 0;
          valve.hardwareState = 0;
        });
      }

      if (zone.wells && zone.wells.length > 0) {
        zone.wells.forEach((well) => {
          well.electricityState = 0;
          well.hardwareState = 0;
        });
      }

      // Save the updated zone
      await zone.save();
    }

    res.status(200).send({
      message: "All pumps, valves, and wells have been reset successfully",
    });
  } catch (err) {
    res.status(500).send({ message: err.message || "Some error occurred." });
  }
};
