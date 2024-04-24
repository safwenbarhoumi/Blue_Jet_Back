const agenda = require('../config')
const Valves = require('../../../models/valves.model')



agenda.define('activate valve', async(job) => {
    const {valveId} = job.attrs.data;
    try {
        await Valves.findByIdAndUpdate(valveId, {state: 1})
        console.log(`Activating valve ID ${valveId}`);
    } catch (error) {
        console.error(`Error activating valve with ID ${valveId}:`, error);
    }
})

agenda.define('desactivate valve', async(job) => {
    const {valveId} = job.attrs.data;
    try {
        await Valves.findByIdAndUpdate(valveId, {state: 0})
        console.log(`Activating valve ID ${valveId}`);
    } catch (error) {
        console.error(`Error activating valve with ID ${valveId}:`, error);
    }
})

function scheduleActivateValve(time, valveId) {
    agenda.schedule(time, 'activate valve', { valveId });
  }
  
function scheduleDesactivateValve(time, valveId) {
    agenda.schedule(time, 'desactivate valve', { valveId });
  }
  
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
   scheduleActivateValve,
    scheduleDesactivateValve,
  }