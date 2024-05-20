const agenda = require("../config");
const Well = require("../../../models/wells.model");
const Zone = require("../../../models/agriculturalZones.model");

agenda.define("activate well", async (job) => {
  const { wellId, zoneId } = job.attrs.data;
  try {
    //await Well.findByIdAndUpdate(wellId, { state: 1 });
    const zone = await Zone.findById(zoneId);
    zone.wells[0].electricityState = 1;
    await zone.save();
  } catch (error) {
    console.error(`Error activating well with ID ${wellId}:`, error);
  }
});

agenda.define("desactivate well", async (job) => {
  const { wellId, zoneId } = job.attrs.data;
  try {
    //await Well.findByIdAndUpdate(wellId, { state: 0 });
    const zone = await Zone.findById(zoneId);
    zone.wells[0].electricityState = 0;
    await zone.save();
  } catch (error) {
    console.error(`Error activating well with ID ${wellId}:`, error);
  }
});

function scheduleActivateWell(time, wellId, zoneId) {
  agenda.schedule(time, "activate well", { wellId, zoneId });
}

function scheduleDesactivateWell(time, wellId, zoneId) {
  agenda.schedule(time, "desactivate well", { wellId, zoneId });
}

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
  scheduleActivateWell,
  scheduleDesactivateWell,
};
