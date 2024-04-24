const Agenda = require('agenda');

const mongoConnectionString = process.env.MONGODB_URI

const agenda = new Agenda({
    db : {
            address : mongoConnectionString,
            collection : 'agendaJob',
            options: { useUnifiedTopology: true }
        },
    processEvery: "1 minute", //the Agenda instance will check for jobs to process every 1 minute.
    maxConcurrency: 20,
})


agenda
 .on('ready', () => (
  console.log("Agenda started!"),
  agenda.start()
  ))

 .on('error', () => console.log("Agenda connection error!"));

 process.on('SIGTERM', async () => {
  await agenda.stop();
  process.exit(0);
});

module.exports = agenda;
