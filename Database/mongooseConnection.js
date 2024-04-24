const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

const connectionString = process.env.MONGODB_URI;

const connectToMongoDB = async () => {
  const maxRetries = 5; // Maximum number of connection retries
  const retryDelay = 5000; // Delay between connection retries in milliseconds (5 seconds in this example)

  let currentRetry = 0;

  while (currentRetry < maxRetries) {
    try {
      await mongoose.connect(connectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        connectTimeoutMS: 40000,
        socketTimeoutMS: 40000,
        //   poolSize: 10,
        //   maxPoolSize: 20
      });
      console.log("Successfully connected to the DB.");
      return; // Exit the retry loop if connection is successful
    } catch (error) {
      console.error(
        `Error in MongoDB connection (Retry ${
          currentRetry + 1
        }/${maxRetries}):`,
        error
      );

      // Increase the retry count
      currentRetry++;

      // Delay before the next retry
      await new Promise((resolve) => setTimeout(resolve, retryDelay));
    }
  }

  // If all retries fail, exit the process
  console.error(
    `Failed to connect to MongoDB after ${maxRetries} retries. Exiting...`
  );
  process.exit(1); // exit the process
};

module.exports = { mongoose, connectToMongoDB };
