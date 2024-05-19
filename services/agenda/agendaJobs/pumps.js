const agenda = require("../config");
const Pump = require("../../../models/pumps.model");
const Zone = require("../../../models/agriculturalZones.model");

/* agenda.define("activate pump", async (job) => {
  const { pumpId } = job.attrs.data;
  try {
    // Update the pump state to "open" in the database
    await Pump.findByIdAndUpdate(pumpId, {
      "zone.pumps.0.electricityState": 1,
    });
    console.log(`Activating pump ID ${pumpId}`);
  } catch (error) {
    console.error(`Error activating pump with ID ${pumpId}:`, error);
  }
}); */
/* agenda.define("activate pump", async (job) => {
  const { pumpId, zoneId } = job.attrs.data;
  const zone = await Zone.findById(zoneId);
  const pumpes = zone.pumps.find((pumpes) => pumpes._id == pumpId);
  try {
    // Log the document before the update for debugging
    //const pumpBefore = await Pump.findById(pumpId);
    const eS = zone.pumps[0].electricityState;
    console.log("electricityState before update:", eS);

    // Update the pump state to "open" in the database using dot notation for nested properties
    await Pump.findByIdAndUpdate(pumpId, {
      eS: 1,
    });

    // Log the document after the update for debugging
    //const pumpAfter = await Pump.findById(pumpId);
    console.log("electricityState after update:", es);

    console.log(`Activating pump ID ${pumpId}`);
  } catch (error) {
    console.error(`Error activating pump with ID ${pumpId}:`, error);
  }
}); */

agenda.define("activate pump", async (job) => {
  const { pumpId, zoneId } = job.attrs.data;
  try {
    // Find the zone by zoneId
    const zone = await Zone.findById(zoneId);
    if (!zone) {
      console.error(`Zone with ID ${zoneId} not found.`);
      return;
    }

    // Find the specific pump within the zone
    const pumpIndex = zone.pumps.findIndex(
      (pump) => pump._id.toString() === pumpId
    );
    if (pumpIndex === -1) {
      console.error(`Pump with ID ${pumpId} not found in zone ${zoneId}.`);
      return;
    }

    // Log the electricityState before the update
    const electricityStateBefore = zone.pumps[pumpIndex].electricityState;
    console.log("ElectricityState before update:", electricityStateBefore);

    // Update the electricityState of the specific pump
    zone.pumps[pumpIndex].electricityState = 1;
    await zone.save();

    // Log the electricityState after the update
    const electricityStateAfter = zone.pumps[pumpIndex].electricityState;
    console.log("ElectricityState after update:", electricityStateAfter);

    console.log(`Activating pump ID ${pumpId}`);
  } catch (error) {
    console.error(`Error activating pump with ID ${pumpId}:`, error);
  }
});

agenda.define("desactivate pump", async (job) => {
  const { pumpId } = job.attrs.data;
  try {
    // Update the pump state to "close" in the database
    await Pump.findByIdAndUpdate(pumpId, { state: 0 });
    console.log(`Deactivating pump with ID ${pumpId}`);
  } catch (error) {
    console.error(`Error deactivating pump with ID ${pumpId}:`, error);
  }
});

function scheduleActivatePump(time, pumpId, zoneId) {
  agenda.schedule(time, "activate pump", { pumpId, zoneId });
}

function scheduleDesactivatePump(time, pumpId) {
  agenda.schedule(time, "desactivate pump", { pumpId });
  //console.log("----------schedule Desactivate pumps is running");
}

// Optionally, handle process events to gracefully shut down Agenda on script termination
process.on("SIGTERM", () => {
  agenda.stop(() => {
    process.exit(0);
  });
});

process.on("SIGINT", () => {
  agenda.stop(() => {
    process.exit(0);
  });
});

module.exports = {
  scheduleActivatePump,
  scheduleDesactivatePump,
};
