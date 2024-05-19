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

agenda.define("activate pump", async (job) => {
  const { pumpId, zoneId } = job.attrs.data;
  try {
    const zone = await Zone.findById(zoneId);
    zone.pumps[0].electricityState = 1;
    await zone.save();
    console.log(`Activating pump ID ${pumpId}`);
  } catch (error) {
    console.error(`Error activating pump with ID ${pumpId}:`, error);
  }
});

agenda.define("desactivate pump", async (job) => {
  const { pumpId, zoneId } = job.attrs.data;
  try {
    const zone = await Zone.findById(zoneId);
    zone.pumps[0].electricityState = 0;
    await zone.save();
    console.log(`Deactivating pump with ID ${pumpId}`);
  } catch (error) {
    console.error(`Error deactivating pump with ID ${pumpId}:`, error);
  }
});

function scheduleActivatePump(time, pumpId, zoneId) {
  agenda.schedule(time, "activate pump", { pumpId, zoneId });
}

function scheduleDesactivatePump(time, pumpId, zoneId) {
  agenda.schedule(time, "desactivate pump", { pumpId, zoneId });
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
