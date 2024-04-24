const Steg = require("../models/steg.model");
const PumpSchedule = require("../models/pumpSchedule.model");
const User = require("../models/user.model");
const Notification = require("../models/notification.model");

const controlledBySteg = async (req, res) => {
  try {
    const userId = req.body.userId;
    const user = await User.findById(userId).populate("farm");
    if (!user || !user.farm) {
      return res.status(404).send({ message: "User not found" });
    }
    const steg = user.farm[0].steg;
    console.log(steg);
    if (!steg) {
      throw new Error("Steg not found");
    }

    if (steg[0].active === 0) {
      isAccident = 1;
      console.log("steg is not active ");
      console.log("this is the  State :\n", user.farm[0].wells[0].state);
      console.log(
        "\n this is the electricity State :\n",
        user.farm[0].wells[0].electricityState
      );

      console.log("updating ... ");
      //console.log(user.farm[0].pump[0].electricityState);
      user.farm[0].wells[0].electricityState = 0;
      user.farm[0].pumps[0].electricityState = 0;
      console.log("==========> updated");
      user.farm[0].steg[0].isAccident = 1;
      await user.farm[0].save();

      const currentDate = new Date().toISOString();
      const newNotification = new Notification({
        title: `The Steg if off : All machines are desactivated`,
        date: currentDate,
        farm: user.farm[0]._id,
      });
      const savedNotification = await newNotification.save();

      console.log("Accident: All machines deactivated");
    }
    if (steg[0].active == 1 && user.farm[0].steg[0].isAccident == 1) {
      console.log("active and accidented !!!");
      user.farm[0].steg[0].isAccident = 0;
      await user.farm[0].save();

      if (steg[0].automatic_mode == 1) {
        /* const pumpDelay = await calculateDelay(
          user.farm[0].pumps.pumpschedule,
          steg[0].automatic_mode
        ); */

        const pumpDelay = await calculateDelay(5000, steg[0].automatic_mode);
        console.log("automatic mode is on");
        console.log("Pump delay is:", pumpDelay);

        setTimeout(() => {
          console.log("Pump activation timeout reached");
          user.farm[0].pumps[0].electricityState = 1;
          user.farm[0].pumps[0].save();
          console.log(`Pump activated after delay: ${pumpDelay} milliseconds`);
        }, pumpDelay);

        if (user.farm[0].wells.electricityState === 0) {
          // Calculate delay based on wellschedule
          const wellDelay = await calculateDelay(wells.wellschedule);
          setTimeout(() => {
            // Update well status to "active" after delay
            user.farm[0].wells.electricityState = 1;
            //user.farm[0].wells.save();
            user.farm[0].pumps[0].save({ suppressWarning: true });
            console.log(
              `Well activated after delay: ${wellDelay} milliseconds`
            );
          }, wellDelay);
        }
      } else if (steg[0].automatic_mode == 0) {
        console.log(
          "Manual mode: Machines remain inactive until activated manually"
        );
      }
      //await steg.save();
      //console.log("Steg state updated in the database");
      console.log("updating in the database!!!!!!!");
      user.farm[0].steg[0].isAccident = 0;
      await user.farm[0].save();
    }
  } catch (error) {
    console.error("Error in controlledBySteg:", error.message);
  }
};

const calculateDelay = (delay, automaticMode) => {
  try {
    if (automaticMode === 1) {
      // Static delay
      console.log("Static delay");
      return 5000;
    } else {
      console.log("Dynamic delay:", delay);
      return delay || 0;
    }
  } catch (error) {
    console.error("Error in calculateDelay:", error.message);
    return 0;
  }
};

module.exports = { controlledBySteg };
