const db = require("../models");
const User = db.user;
/*-------------------------------- Embedded system API------------------------------------------------------*/

exports.reset = async (req, res) => {
  try {
    const { phone } = req.body;

    const user = await User.findOne({ phone: phone }).populate("farm");

    if (!user || !user.farm) {
      return res.status(404).send({ message: "User not found" });
    }
    let message = "reset";
    return res.status(200).send(message);
  } catch (error) {
    ("error has occured");
  }
};

exports.getwellstate = async (req, res) => {
  try {
    const { phone, wellId } = req.body;

    const user = await User.findOne({ phone: phone }).populate("farm");

    if (!user || !user.farm) {
      return res.status(404).send({ message: "User not found" });
    }
    let response = "";
    user.farm[0].wells.forEach((well, index) => {
      if (well._id.toString() === wellId) {
        response += well.etat;
      }
    });

    if (response === "") {
      return res.status(404).send({ message: "Well not found" });
    }

    return res.status(200).send(response);
  } catch (err) {
    res.status(500).send({ message: err.message || "Some error occurred" });
  }
}; 

exports.postcourant = async (req, res) => {
  try {
    const { phone, wellId, steg } = req.body;

    const user = await User.findOne({ phone: phone }).populate("farm");
    if (!user || !user.farm) {
      return res.status(404).send({ message: "User not found" });
    }

    const targetwell = user.farm[0].wells.find(
      (well) => well._id.toString() === wellId
    );
    if (!targetwell) {
      return res.status(400).send({ message: "Invalid well ID." });
    }

    targetwell.courant = steg;
    await user.farm[0].save();

    return res.status(200).send(targetwell);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message || "Some error occurred." });
  }
};

exports.postcourantpumpe = async (req, res) => {
  try {
    const { phone, pumpeId, steg } = req.body;

    const user = await User.findOne({ phone: phone }).populate("farm");
    if (!user || !user.farm) {
      return res.status(404).send({ message: "User not found" });
    }

    const targetpumpe = user.farm[0].pumpes.find(
      (pumpe) => pumpe._id.toString() === pumpeId
    );
    if (!targetpumpe) {
      return res.status(400).send({ message: "Invalid pumpe ID." });
    }

    targetpumpe.courant = steg;
    await user.farm[0].save();

    return res.status(200).send(targetpumpe);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message || "Some error occurred." });
  }
};

exports.postetatpumpe = async (req, res) => {
  try {
    const { phone, pumpeId, state } = req.body;

    const user = await User.findOne({ phone: phone }).populate("farm");
    if (!user || !user.farm) {
      return res.status(404).send({ message: "User not found" });
    }

    const targetpumpe = user.farm[0].pumpes.find(
      (pumpe) => pumpe._id.toString() === pumpeId
    );
    if (!targetpumpe) {
      return res.status(400).send({ message: "Invalid pumpe ID." });
    }

    targetpumpe.state = state;
    await user.farm[0].save();

    return res.status(200).send(targetpumpe.etat);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message || "Some error occurred." });
  }
};

exports.postetatvanne = async (req, res) => {
  try {
    const { phone, vanneId, zoneID, state } = req.body;

    const user = await User.findOne({ phone: phone }).populate("farm");
    if (!user || !user.farm) {
      return res.status(404).send({ message: "User not found" });
    }

    // Find the target zone based on zoneID
    const targetZone = user.farm[0].find(
      (zone) => zone._id.toString() === zoneID
    );

    if (!targetZone) {
      return res.status(400).send({ message: "Invalid zone ID." });
    }

    // Find the target vanne based on vanneId within the target zone
    const targetVanne = targetZone.electrovannes.flatMap(
      (electrovanne) => electrovanne._id.toString() === vanneId
    );

    if (!targetVanne) {
      return res.status(400).send({ message: "Invalid vanne ID." });
    }

    // Update the state of the target vanne
    targetVanne.state = state;

    // Save the changes to the user's farm
    await user.farm[0].save();

    // Respond with the updated state of the target vanne
    return res.status(200).send(targetVanne.etat);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message || "Some error occurred." });
  }
};

 exports.postetatwell = async (req, res) => {
  try {
    const { phone, wellId, state } = req.body;
    const user = await User.findOne({ phone: phone }).populate("farm");
    if (!user || !user.farm) {
      return res.status(404).send({ message: "User not found" });
    }

    const targetwell = user.farm[0].wells.find(
      (well) => well._id.toString() === wellId
    );
    if (!targetwell) {
      return res.status(400).send({ message: "Invalid pumpe ID." });
    }

    targetwell.state = state;
    await user.farm[0].save();

    return res.status(200).send(targetwell.state);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message || "Some error occurred." });
  }
}; 

exports.getpumpestate = async (req, res) => {
  try {
    const { phone, pumpeId } = req.body;

    const user = await User.findOne({ phone: phone }).populate("farm");

    if (!user || !user.farm) {
      return res.status(404).send({ message: "User not found" });
    }

    let response = "";
    user.farm[0].pumpes.forEach((pumpe) => {
      if (pumpe._id.toString() === pumpeId) {
        response += pumpe.etat;
      }
    });

    if (response === "") {
      return res.status(404).send({ message: "Pumpe not found" });
    }

    return res.status(200).send(response);
  } catch (err) {
    res.status(500).send({ message: err.message || "Some error occurred" });
  }
};

exports.getvannestate = async (req, res) => {
  try {
    const { phone, zoneId, electrovanneId } = req.body;
    const user = await User.findOne({ phone: phone }).populate("farm");
    if (!user || !user.farm) {
      return res.status(404).send({ message: "User not found" });
    }
    const targetZone = user.farm[0].zones.find(
      (zone) => zone._id.toString() === zoneId
    );
    if (!targetZone) {
      return res.status(404).send({ message: "Zone not found" });
    }
    const electrovanne = targetZone.electrovannes.find(
      (electrovanne) => electrovanne._id.toString() === electrovanneId
    );
    if (!electrovanne) {
      return res.status(404).send({ message: "Electrovanne not found" });
    }

    const currentEtat = await electrovanne.Etat;
    return res.status(200).send(currentEtat);
  } catch (err) {
    res.status(500).send({ message: err.message || "Some error occurred" });
  }
};

exports.postcurrentvanne = async (req, res) => {
  try {
    const { phone, zoneId, electrovanneId } = req.body;
    const user = await User.findOne({ phone: phone }).populate("farm");
    if (!user || !user.farm) {
      return res.status(404).send({ message: "User not found" });
    }
    const targetZone = user.farm[0].zones.find(
      (zone) => zone._id.toString() === zoneId
    );
    if (!targetZone) {
      return res.status(404).send({ message: "Zone not found" });
    }
    const electrovanne = targetZone.electrovannes.find(
      (electrovanne) => electrovanne._id.toString() === electrovanneId
    );
    if (!electrovanne) {
      return res.status(404).send({ message: "Electrovanne not found" });
    }

    electrovanne.Etat = "vide";
    await user.farm[0].save();

    return res.status(200).send(electrovanne.Etat);
  } catch (err) {
    res.status(500).send({ message: err.message || "Some error occurred" });
  }
};

exports.postcurrentpumpe = async (req, res) => {
  try {
    const { phone, pumpeId } = req.body;

    const user = await User.findOne({ phone: phone }).populate("farm");
    if (!user || !user.farm) {
      return res.status(404).send({ message: "User not found" });
    }

    const Pumpe = user.farm[0].pumpes.find(
      (pumpe) => pumpe._id.toString() == pumpeId
    );

    Pumpe.etat = "vide";
    await user.farm[0].save();

    return res.status(200).send(Pumpe.etat);
  } catch (error) {
    res.status(500).send({ message: err.message });
  }
};

exports.postcurrentwell = async (req, res) => {
  try {
    const { phone, wellId } = req.body;

    const user = await User.findOne({ phone: phone }).populate("farm");
    if (!user || !user.farm) {
      return res.status(404).send({ message: "User not found" });
    }

    const Well = user.farm[0].wells.find(
      (well) => well._id.toString() == wellId
    );

    Well.etat = "vide";
    await user.farm[0].save();

    return res.status(200).send(Well.etat);
  } catch (error) {
    res.status(500).send({ message: err.message });
  }
};

exports.postcapteur = async (req, res) => {
  try {
    const { phone, zoneId, capteurs } = req.body;

    const user = await User.findOne({ phone: phone }).populate("farm");
    if (!user || !user.farm) {
      return res.status(404).send({ message: "User not found." });
    }

    const targetZone = user.farm[0].zones.find(
      (zone) => zone._id.toString() === zoneId
    );
    if (!targetZone) {
      return res.status(400).send({ message: "Invalid zone ID." });
    }

    targetZone.capteurs = capteurs;

    await user.farm[0].save();

    return res.status(200).send(targetZone.capteurs);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message || "Some error occurred." });
  }
};

/*-------------------------------- Mobile APP API------------------------------------------------------*/

/* exports.getculture = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await User.findById(userId).populate("farm");
    if (!user || !user.farm) {
      return res.status(404).send({ message: "User not found" });
    }
    const culture = user.farm[0].culture;
    res.status(200).send({ culture });
  } catch (err) {
    res.status(500).send({ message: "some error occurred else where " });
  }
}; */

/* exports.getalarme = async (req, res) => {

    try {
        const { phone } = req.body;

        const user = await User.findOne({ phone: phone }).populate("farm");
        if (!user || !user.farm) {

            return res.status(404).send({ message: "User not found" });
        }
        const alarme = user.farm[0].alarme;
        res.status(200).send(alarme);

    }
    catch (err) {
        res.status(500).send({ message: "some error occurred else where " });
    }

} */

/* exports.getZones = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await User.findById(userId).populate("farm");
    if (!user || !user.farm) {
      return res.status(404).send({ message: "User not found" });
    }
    const numberOfZones = user.farm[0].zones;
    res.status(200).send(numberOfZones);
  } catch (err) {
    res.status(500).send({ message: "some error occurred else where " });
  }
}; */

/* exports.getwell = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await User.findById(userId).populate("farm");
    if (!user || !user.farm) {
      return res.status(404).send({ message: "User not found" });
    }
    const well = user.farm[0].wells;
    res.status(200).send(well);
  } catch (err) {
    res.status(500).send({ message: err.message || "some error occurred " });
  }
}; */

/* exports.getpumpe = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await User.findById(userId).populate("farm");
    if (!user || !user.farm) {
      return res.status(404).send({ message: "User not found" });
    }
    const pumpes = user.farm[0].pumpes;
    res.status(200).send(pumpes);
  } catch (err) {
    res.status(500).send({ message: err.message || "some error occurred " });
  }
}; */

/* exports.getvannes = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await User.findById(userId).populate("farm");
    if (!user || !user.farm) {
      return res.status(404).send({ message: "User not found" });
    }

    const electrovannes = user.farm[0].zones.flatMap(
      (zone) => zone.electrovannes
    );
    res.status(200).send(electrovannes);
  } catch (err) {
    res.status(500).send({ message: err.message || "some error occurred " });
  }
}; */

/* exports.getcapteurs = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await User.findById(userId).populate("farm");

    if (!user || !user.farm) {
      return res.status(404).send({ message: "User not found" });
    }

    const capteurs = user.farm[0].zones.flatMap((zone) => zone.capteurs);
    res.status(200).send(capteurs);
  } catch (err) {
    res.status(500).send({ message: err.message || "Some error occurred" });
  }
}; */

/* exports.updatepumpes = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await User.findById(userId).populate("farm");

    if (!user || !user.farm) {
      return res.status(404).send({ message: "User not found." });
    }
    const pumpeId = req.body.id;
    console.log(pumpeId);

    const pumpes = user.farm[0].pumpes.find((pumpes) => pumpes._id == pumpeId);
    if (!pumpes) {
      return res.status(404).send({ message: "pump not found." });
    }
    pumpes.etat = req.body.etat;

    await user.farm[0].save();

    res.status(200).send({ message: "pumpe state updated successfully." });
  } catch (err) {
    res.status(500).send({ message: err.message || "Some error occurred." });
  }
}; */

/* exports.updatewell = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await User.findById(userId).populate("farm");

    if (!user || !user.farm) {
      return res.status(404).send({ message: "User not found." });
    }

    const wellId = req.body.id;
    console.log(wellId);

    const wells = user.farm[0].wells.find((wells) => wells._id == wellId);
    if (!wells) {
      return res.status(404).send({ message: "Well not found." });
    }
    wells.etat = req.body.etat;

    await user.farm[0].save();

    res.status(200).send({ message: "Well state updated successfully." });
  } catch (err) {
    res.status(500).send({ message: err.message || "Some error occurred." });
  }
}; */

/* exports.updatevannes = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await User.findById(userId).populate("farm");
    if (!user || !user.farm) {
      return res.status(404).send({ message: "user not found" });
    }
    const vanneId = req.body.id;
    let vanneToUpdate;
    for (const zone of user.farm[0].zones) {
      vanneToUpdate = zone.electrovannes.find((vanne) => vanne._id == vanneId);
      if (vanneToUpdate) {
        vanneToUpdate.Etat = req.body.Etat;
        break;
      }
    }
    if (!vanneToUpdate) {
      return res.status(404).send({ message: "Vanne not found" });
    }

    await user.farm[0].save();
    res.status(200).send({ message: "Vanne state updated successfully." });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}; */

/* exports.getlocalisation = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await User.findById(userId).populate("farm");
    if (!user || !user.farm) {
      return res.status(404).send({ message: "User not found" });
    }

    const localisation = user.farm[0].localisation_farm;
    res.status(200).send(localisation);
  } catch (err) {
    res.status(500).send({ message: err.message || "some error occurred " });
  }
}; */

/* exports.createwellschedule = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId).populate("farm");
    if (!user || !user.farm) {
      return res.status(404).send({ message: "User not found." });
    }
    const wellId = req.body.id;
    const wellschedule = req.body.wellschedule;

    const well = user.farm[0].wells.find((wells) => wells._id == wellId);
    if (!well) {
      return res.status(404).send({ message: "well not found." });
    }
    well.schedule = wellschedule;
    await user.farm[0].save();
    res.status(200).send({ message: "well Schedule updated successfully." });
  } catch (err) {
    res.status(500).send({ message: err.message || "Some error occurred." });
  }
};

exports.createvanneschedule = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await User.findById(userId).populate("farm");
    if (!user || !user.farm) {
      return res.status(404).send({ message: "User not found." });
    }

    const vanneId = req.body.id;
    const schedule = req.body.schedule;

    for (const zone of user.farm[0].zones) {
      let vanneToSchedule;
      vanneToSchedule = zone.electrovannes.find(
        (vanne) => vanne._id == vanneId
      );
      if (vanneToSchedule) {
        vanneToSchedule.vanneschedule = schedule;
        break;
      }
    }

    if (!vanneToSchedule) {
      return res.status(404).send({ message: "Vanne not found" });
    } else {
      await user.farm[0].save();

      res.status(200).send({ message: "Vanne schedule updated successfully." });
    }
  } catch (err) {
    res.status(500).send({ message: err.message || "Some error occurred." });
  }
};

exports.createpumpschedule = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await User.findById(userId).populate("farm");
    if (!user || !user.farm) {
      return res.status(404).send({ message: "User not found." });
    }

    const pumpId = req.body.id;
    const pumpschedule = req.body.pumpschedule;

    const pump = user.farm[0].pumpes.find((pumpes) => pumpes._id == pumpId);
    if (!pump) {
      return res.status(404).send({ message: "pump not found." });
    }

    pump.pumpschedule = pumpschedule;

    await user.farm[0].save();
    res.status(200).send({ message: "pump Schedule updated successfully." });
  } catch (err) {
    res.status(500).send({ message: err.message || "Some error occurred." });
  }
}; */

/* exports.updatealarme = async (req, res) => {
    try {

        const userId = req.userId;

        const user = await User.findById(userId).populate("farm");
        if (!user || !user.farm) {
            return res.status(404).send({ message: "user not found" });
        }

        const alarmestate = req.body.alarme

        user.farm[0].alarme = alarmestate;

        await user.farm[0].save();

        res.status(200).send({ message: 'alarme updated successfully' });
    } catch (error) {
        res.status(500).send({ message: error.message || "Some error occurred." });
    }

} */

/* exports.resetvanne = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await User.findById(userId).populate("farm");
    if (!user || !user.farm) {
      return res.status(404).send({ message: "User not found" });
    }

    const farm = user.farm[0];
    const zones = farm.zones;

    zones.forEach((zone) => {
      const electrovannes = zone.electrovannes;

      electrovannes.forEach((electrovanne) => {
        electrovanne.Etat = "fermé";
      });
    });

    await farm.save();
    return res
      .status(200)
      .send({ message: "Electrovannes reset successfully." });
  } catch (error) {
    res.status(500).send({ message: error.message || "Some error occurred." });
  }
}; */

/* exports.resetwells = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await User.findById(userId).populate("farm");
    if (!user || !user.farm) {
      return res.status(404).send({ message: "User not found " });
    }

    const farm = user.farm[0];

    farm.wells.forEach((element) => {
      element.etat = "fermé";
    });

    await farm.save();
    return res.status(200).send({ message: "wells reset successfully" });
  } catch (error) {
    res.status(500).send({ message: error.message || "some error happened" });
  }
}; */

/* exports.resetpumpes = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await User.findById(userId).populate("farm");
    if (!user || !user.farm) {
      return res.status(404).send({ message: "User not found " });
    }

    const farm = user.farm[0];

    farm.pumpes.forEach((element) => {
      element.etat = "fermé";
    });

    await farm.save();
    return res.status(200).send({ message: "pumpes reset successfully" });
  } catch (error) {
    res.status(500).send({ message: error.message || "some error happened" });
  }
}; */
