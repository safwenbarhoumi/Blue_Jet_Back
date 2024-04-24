const Farm = require("../models/Farm.model");
const User = require("../models/user.model");

exports.getCulture = async (req, res) => {
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
};
