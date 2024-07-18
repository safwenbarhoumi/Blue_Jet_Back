const agenda = require("../config");
const Alarm = require("../../../models/alarm.model");
const Farm = require("../../../models/farm.model");

agenda.define("activate alarm", async (job) => {
  const { farmId } = job.attrs.data;
  try {
    const farm = await Farm.findById(farmId);
    if (farm) {
      farm.alarmState = 1;
      await farm.save();
      console.log(`Activating alarm for farm ID ${farmId}`);
    } else {
      console.error(`Farm with ID ${farmId} not found`);
    }
  } catch (error) {
    console.error(`Error activating alarm for farm ID ${farmId}:`, error);
  }
});

agenda.define("deactivate alarm", async (job) => {
  const { farmId } = job.attrs.data;
  try {
    const farm = await Farm.findById(farmId);
    if (farm) {
      farm.alarmState = 0;
      await farm.save();
      console.log(`Deactivating alarm for farm ID ${farmId}`);
    } else {
      console.error(`Farm with ID ${farmId} not found`);
    }
  } catch (error) {
    console.error(`Error deactivating alarm for farm ID ${farmId}:`, error);
  }
});

function scheduleActivateAlarm(time, farmId) {
  agenda.schedule(time, "activate alarm", { farmId });
}

function scheduleDeactivateAlarm(time, farmId) {
  agenda.schedule(time, "deactivate alarm", { farmId });
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
  scheduleActivateAlarm,
  scheduleDeactivateAlarm,
};
