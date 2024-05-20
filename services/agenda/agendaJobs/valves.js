const agenda = require("../config");
const Valves = require("../../../models/valves.model");
const Zone = require("../../../models/agriculturalZones.model");

/* agenda.define("activate valve", async (job) => {
  const { valveId, zoneId } = job.attrs.data;
  try {
    // await Valves.findByIdAndUpdate(valveId, {state: 1})
    const zone = await Zone.findById(zoneId);
    zone.valves[0].electricityState = 1;
    await zone.save();
    console.log(`Activating valve ID ${valveId}`);
  } catch (error) {
    console.error(`Error activating valve with ID ${valveId}:`, error);
  }
}); */
agenda.define("activate valve", async (job) => {
  const { valveId, zoneId } = job.attrs.data;
  try {
    console.log("hello i m here  ");
    console.log("the zone id is : ", zoneId);
    console.log("the valve id  : ", valveId);
    const zone = await Zone.findById(zoneId);
    if (!zone) {
      console.error(`Zone with ID ${zoneId} not found.`);
      return;
    }

    const valve = zone.valves.find((v) => v._id.toString() === valveId);
    if (!valve) {
      console.error(`Valve with ID ${valveId} not found in zone ${zoneId}.`);
      return;
    }
    console.log("valve before1 : ", valve.electricityState);
    valve.electricityState = 1;
    console.log("valve after1 : ", valve.electricityState);
    await zone.save();
    console.log(`Activating valve ID ${valveId}`);
  } catch (error) {
    console.error(`Error activating valve with ID ${valveId}:`, error);
  }
});

/* agenda.define("deactivate valve", async (job) => {
  const { valveId, zoneId } = job.attrs.data;
  try {
    
    const zone = await Zone.findById(zoneId);
    if (!zone) {
      console.error(`Zone with ID ${zoneId} not found.`);
      return;
    }
    console.log("the zone id is : ", zoneId);

    const valve = zone.valves.find((v) => v._id.toString() === valveId);
    console.log("the valve is  : ", valve);
    if (!valve) {
      console.error(`Valve with ID ${valveId} not found in zone ${zoneId}.`);
      return;
    }

    valve.electricityState = 0;
    await zone.save();
    console.log(`Deactivating valve ID ${valveId}`);
  } catch (error) {
    console.error(`Error deactivating valve with ID ${valveId}:`, error);
  }
}); */

agenda.define("desactivate valve", async (job) => {
  const { valveId, zoneId } = job.attrs.data;
  try {
    // await Valves.findByIdAndUpdate(valveId, {state: 0})
    const zone = await Zone.findById(zoneId);
    zone.valves[0].electricityState = 0;
    await zone.save();
    console.log(`Desactivating valve ID ${valveId}`);
  } catch (error) {
    console.error(`Error activating valve with ID ${valveId}:`, error);
  }
});

function scheduleActivateValve(time, valveId, zoneId) {
  agenda.schedule(time, "activate valve", { valveId, zoneId });
}

function scheduleDesactivateValve(time, valveId, zoneId) {
  agenda.schedule(time, "desactivate valve", { valveId, zoneId });
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
  scheduleActivateValve,
  scheduleDesactivateValve,
};
