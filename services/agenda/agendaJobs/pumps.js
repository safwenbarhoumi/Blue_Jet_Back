const agenda = require('../config'); 
const Pump = require("../../../models/pumps.model");


agenda.define('activate pump', async (job) => {
  const { pumpId } = job.attrs.data;
  try {
    // Update the pump state to "open" in the database
    await Pump.findByIdAndUpdate(pumpId, { state: 1 });
    console.log(`Activating pump ID ${pumpId}`);
  } catch (error) {
    console.error(`Error activating pump with ID ${pumpId}:`, error);
  }
});

agenda.define('desactivate pump', async (job) => {
  const { pumpId } = job.attrs.data;
  try {
    // Update the pump state to "close" in the database
    await Pump.findByIdAndUpdate(pumpId, { state: 0 });
    console.log(`Deactivating pump with ID ${pumpId}`);
  } catch (error) {
    console.error(`Error deactivating pump with ID ${pumpId}:`, error);
  }
});

function scheduleActivatePump(time, pumpId) {
  agenda.schedule(time, 'activate pump', { pumpId });
}

function scheduleDesactivatePump(time, pumpId) {
  agenda.schedule(time, 'desactivate pump', { pumpId });
}

// Optionally, handle process events to gracefully shut down Agenda on script termination
process.on('SIGTERM', () => {
  agenda.stop(() => {
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  agenda.stop(() => {
    process.exit(0);
  });
});


module.exports = {
  scheduleActivatePump,
  scheduleDesactivatePump,
};
