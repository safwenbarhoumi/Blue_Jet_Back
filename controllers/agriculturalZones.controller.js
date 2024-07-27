const User = require("../models/user.model");
const Zone = require("../models/agriculturalZones.model");
const Pump = require("../models/pumps.model");
const Activity = require("../models/activity");
const Farm = require("../models/Farm.model");
const mongoose = require("mongoose");

exports.getFarmsWithDetails = async (req, res) => {
  try {
    // Find all farms
    const farms = await Farm.find({});
    if (!farms || farms.length === 0) {
      return res.status(404).send({ message: "No farms found" });
    }

    // Structure the response
    const result = farms.map((farm) => ({
      farmId: farm._id,
      region: farm.region,
      culture: farm.culture,
      zones: farm.zones.map((zone) => ({
        zoneId: zone._id,
        zoneName: zone.name, // Assuming the zone has a name field
        wells: zone.wells.map((well) => ({
          wellId: well._id,
          nameWell: well.nameWell, // Adjust this field based on your actual schema
        })),
        valves: zone.valves.map((valve) => ({
          valveId: valve._id,
          nameValve: valve.nameValve, // Adjust this field based on your actual schema
        })),
        pumps: zone.pumps.map((pump) => ({
          pumpId: pump._id,
          namePump: pump.namePump, // Adjust this field based on your actual schema
        })),
      })),
      wells: farm.wells.map((well) => ({
        wellId: well._id,
        nameWell: well.nameWell, // Adjust this field based on your actual schema
      })),
      pumps: farm.pumps.map((pump) => ({
        pumpId: pump._id,
        namePump: pump.namePump, // Adjust this field based on your actual schema
      })),
      steg: farm.steg.map((steg) => ({
        stegId: steg._id,
        stegName: steg.name, // Adjust this field based on your actual schema
      })),
    }));

    // Send the structured response
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send({ message: err.message || "Some error occurred." });
  }
};

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

exports.updateNameWellByZoneId = async (req, res) => {
  try {
    const zoneId = req.params.zoneId;
    const nameWell = req.body.newnameWell;

    // Find the zone
    const zone = await Zone.findById(zoneId);
    if (!zone) {
      return res.status(404).send({ message: "Zone not found" });
    }

    // Check if there is at least one well in the zone
    if (!zone.wells || zone.wells.length === 0) {
      return res.status(404).send({ message: "No wells found in the zone" });
    }

    // Update the nameWell of the first well in the zone
    zone.wells[0].namewell = nameWell;

    // Save the updated zone
    await zone.save();

    res.status(200).send({ message: "Well name updated successfully" });
  } catch (err) {
    res.status(500).send({ message: err.message || "Some error occurred." });
  }
};

exports.updatePumpNameByZoneId = async (req, res) => {
  try {
    const zoneId = req.params.zoneId;
    const namePump = req.body.namePump;

    // Find the zone
    const zone = await Zone.findById(zoneId);
    if (!zone) {
      return res.status(404).send({ message: "Zone not found" });
    }

    // Check if there is at least one pump in the zone
    if (!zone.pumps || zone.pumps.length === 0) {
      return res.status(404).send({ message: "No pumps found in the zone" });
    }

    // Update the namePump of the first pump in the zone
    zone.pumps[0].namePump = namePump;

    // Save the updated zone
    await zone.save();

    res.status(200).send({ message: "Pump name updated successfully" });
  } catch (err) {
    res.status(500).send({ message: err.message || "Some error occurred." });
  }
};

exports.getFarmDetailIdByPhone = async (req, res) => {
  try {
    const { phoneNumber } = req.params;

    // Find the user by phone number
    const user = await User.findOne({ phone: phoneNumber });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    // Get the farm associated with the user
    const farmId = user.farm; // Assuming user.farm holds the farm ID
    const farm = await Farm.findOne({ _id: farmId });
    if (!farm) {
      return res.status(404).send({ message: "Farm not found" });
    }

    // Structure the response
    const result = {
      farmId: farm._id,
      region: farm.region,
      culture: farm.culture,
      zones: farm.zones.map((zone) => ({
        zoneId: zone._id,
        zoneName: zone.name, // Assuming the zone has a name field
        wells: zone.wells.map((well) => ({
          wellId: well._id,
          nameWell: well.nameWell, // Adjust this field based on your actual schema
        })),
        valves: zone.valves.map((valve) => ({
          valveId: valve._id,
          nameValve: valve.nameValve, // Adjust this field based on your actual schema
        })),
        pumps: zone.pumps.map((pump) => ({
          pumpId: pump._id,
          namePump: pump.namePump, // Adjust this field based on your actual schema
        })),
      })),
      wells: farm.wells.map((well) => ({
        wellId: well._id,
        nameWell: well.nameWell, // Adjust this field based on your actual schema
      })),
      pumps: farm.pumps.map((pump) => ({
        pumpId: pump._id,
        namePump: pump.namePump, // Adjust this field based on your actual schema
      })),
      steg: farm.steg.map((steg) => ({
        stegId: steg._id,
        stegName: steg.name, // Adjust this field based on your actual schema
      })),
    };

    // Send the structured response
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send({ message: err.message || "Some error occurred." });
  }
};

exports.getZoneDetailsByFarmId = async (req, res) => {
  try {
    const farmId = req.params.farmId;

    // Fetch zones by farm ID
    const zones = await Zone.find({ farm: farmId });

    // Check if any zones are found
    if (zones.length === 0) {
      return res
        .status(404)
        .send({ message: "No zones found for this farm ID" });
    }

    // Return the zones
    res.status(200).send(zones);
  } catch (err) {
    res.status(500).send({ message: "Some error occurred elsewhere" });
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

/* exports.updatePumpById = async (req, res) => {
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
}; */
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

    // Create a new activity
    const newActivity = new Activity({
      num_zone: zoneId, // Assuming zoneId is the number zone
      description: "Le pompe a été modifié",
      date: new Date().toISOString(), // Current date and time
      farm: zone.farm[0]._id, // Assuming the zone has a farm reference
    });
    // Save the new activity to the database
    await newActivity.save();

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

    // Create a new activity
    const newActivity = new Activity({
      num_zone: zoneId, // Assuming zoneId is the number zone
      description: "Le puits a été modifié",
      date: new Date().toISOString(), // Current date and time
      farm: zone.farm[0]._id, // Assuming the zone has a farm reference
    });
    // Save the new activity to the database
    await newActivity.save();

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
    // Create a new activity
    const newActivity = new Activity({
      num_zone: zoneId, // Assuming zoneId is the number zone
      description: "une valve a été modifié",
      date: new Date().toISOString(), // Current date and time
      farm: zone.farm[0]._id, // Assuming the zone has a farm reference
    });
    // Save the new activity to the database
    await newActivity.save();

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
    //console.log("Saved zone: ", savedZone);
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
    // Create a new activity
    const newActivity = new Activity({
      num_zone: zoneId, // Assuming zoneId is the number zone
      description: "Tout les valve d'un zone ont été modifié",
      date: new Date().toISOString(), // Current date and time
      farm: zone.farm[0]._id, // Assuming the zone has a farm reference
    });
    // Save the new activity to the database
    await newActivity.save();

    res
      .status(200)
      .send({ message: "All valves in the zone updated successfully" });
  } catch (err) {
    res.status(500).send({ message: err.message || "Some error occurred." });
  }
};

exports.updateLocationByFarmId = async (req, res) => {
  try {
    const { farmId } = req.params;
    const { latitude, longitude } = req.body;

    // Validate input
    if (latitude === undefined || longitude === undefined) {
      return res
        .status(400)
        .send({ message: "Latitude and longitude are required" });
    }

    // Update the zones associated with the farm
    const updatedZones = await Zone.updateMany(
      { farm: farmId },
      {
        $set: {
          "localisation_zone.latitude": latitude,
          "localisation_zone.longitude": longitude,
        },
      }
    );

    if (updatedZones.matchedCount === 0) {
      return res
        .status(404)
        .send({ message: "No zones found for the specified farm ID" });
    }

    res.status(200).send({ message: "Locations updated successfully" });
  } catch (err) {
    res.status(500).send({ message: err.message || "Some error occurred." });
  }
};

exports.updateLocationByZoneId = async (req, res) => {
  try {
    const zoneId = req.params.zoneId;
    const { latitude, longitude } = req.body;

    // Validate input
    if (latitude === undefined || longitude === undefined) {
      return res
        .status(400)
        .send({ message: "Latitude and longitude are required" });
    }

    const zone = await Zone.findById(zoneId);
    //console.log("zone id ======> ", zoneId);
    //console.log("zone ======> ", zone);
    if (!zone) {
      return res.status(404).send({ message: "Zone not found" });
    }

    // Update the location of the zone
    const updatedZone = await Zone.findByIdAndUpdate(
      zoneId,
      {
        $set: {
          "localisation_zone.latitude": latitude,
          "localisation_zone.longitude": longitude,
        },
      },
      { new: true } // Return the updated document
    );

    if (!updatedZone) {
      return res
        .status(404)
        .send({ message: "Zone not found for the specified zone ID" });
    }

    res
      .status(200)
      .send({ message: "Location updated successfully", updatedZone });
  } catch (err) {
    res.status(500).send({ message: err.message || "Some error occurred." });
  }
};

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

      // Create a new activity
      const newActivity = new Activity({
        //num_zone: zoneId, // Assuming zoneId is the number zone
        description: "Touts les machines de votre farm ont été rénitialisation",
        date: new Date().toISOString(), // Current date and time
        farm: zone.farm[0]._id, // Assuming the zone has a farm reference
      });
      // Save the new activity to the database
      await newActivity.save();

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

exports.getWaterByZoneId = async (req, res) => {
  try {
    const zoneId = req.params.zoneId;

    // Find the zone
    const zone = await Zone.findById(zoneId);
    if (!zone) {
      return res.status(404).send({ message: "Zone not found" });
    }

    // Check if there is at least one well in the zone
    if (!zone.wells || zone.wells.length === 0) {
      return res.status(404).send({ message: "No wells found in the zone" });
    }

    // Calculate total allWater and usedWater for the zone
    let totalAllWater = 0;
    let totalUsedWater = 0;

    zone.wells.forEach((well) => {
      totalAllWater += well.allWater;
      totalUsedWater += well.usedWater;
    });

    // Structure the response
    const result = {
      zoneId: zone._id,
      totalAllWater: totalAllWater,
      totalUsedWater: totalUsedWater,
    };

    // Send the structured response
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send({ message: err.message || "Some error occurred." });
  }
};

exports.addWaterByZoneId = async (req, res) => {
  try {
    const zoneId = req.params.zoneId;
    let { allWater, usedWater } = req.body;

    // Validate and parse input
    allWater = parseFloat(allWater);
    usedWater = parseFloat(usedWater);

    if (isNaN(allWater) || isNaN(usedWater)) {
      return res.status(400).send({
        message:
          "Invalid input. 'allWater' and 'usedWater' should be valid numbers.",
      });
    }

    // Find the zone
    const zone = await Zone.findById(zoneId);
    if (!zone) {
      return res.status(404).send({ message: "Zone not found" });
    }

    // Check if there is at least one well in the zone
    if (!zone.wells || zone.wells.length === 0) {
      return res.status(404).send({ message: "No wells found in the zone" });
    }

    // Update the water data with the new values
    zone.wells.forEach((well) => {
      well.allWater = allWater;
      well.usedWater = usedWater;
    });

    // Save the updated zone back to the database
    await zone.save();

    // Structure the response
    const result = {
      zoneId: zone._id,
      message: "Water data updated successfully",
      totalAllWater: zone.wells.reduce(
        (total, well) => total + well.allWater,
        0
      ),
      totalUsedWater: zone.wells.reduce(
        (total, well) => total + well.usedWater,
        0
      ),
    };

    // Send the structured response
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send({ message: err.message || "Some error occurred." });
  }
};
