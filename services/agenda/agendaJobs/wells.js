const agenda = require('../config')
const Well = require('../../../models/wells.model')



agenda.define('activate well', async(job) => {
    const {wellId} = job.attrs.data;
    try {
        await Well.findByIdAndUpdate(wellId, {state: 1})
        console.log(`Activating well ID ${wellId}`);
    } catch (error) {
        console.error(`Error activating well with ID ${wellId}:`, error);
    }
})

agenda.define('desactivate well', async(job) => {
    const {wellId} = job.attrs.data;
    try {
        await Well.findByIdAndUpdate(wellId, {state: 0})
        console.log(`Activating well ID ${wellId}`);
    } catch (error) {
        console.error(`Error activating well with ID ${wellId}:`, error);
    }
})

function scheduleActivateWell(time, wellId) {
    agenda.schedule(time, 'activate well', { wellId });
  }
  
  function scheduleDesactivateWell(time, wellId) {
    agenda.schedule(time, 'desactivate well', { wellId });
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
    scheduleActivateWell,
    scheduleDesactivateWell,
  }