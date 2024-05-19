const Agenda = require("agenda");

const mongoConnectionString = process.env.MONGODB_URI;

const agenda = new Agenda({
  db: {
    address: mongoConnectionString,
    collection: "agendaJob",
    options: { useUnifiedTopology: true },
  },
  processEvery: "1 minute", //the Agenda instance will check for jobs to process every 1 minute.
  maxConcurrency: 20,
});

// Define the job
agenda.define("activate pump", async (job) => {
  const { pumpId } = job.attrs.data;
  // Find the pump by pumpId and update the electricityState
  await Pump.findOneAndUpdate(
    { pumpId: pumpId },
    { electricityState: 1 },
    { new: true }
  );

  console.log(`Pump ${pumpId} activated.`);
});

agenda
  .on("ready", () => (console.log("Agenda started!"), agenda.start()))

  .on("error", () => console.log("Agenda connection error!"));
process.on("SIGTERM", async () => {
  await agenda.stop();
  process.exit(0);
});

module.exports = agenda;
