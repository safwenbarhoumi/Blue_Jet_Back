const db = require("../models");
const User = db.user;

exports.getProfile = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await User.findById(userId).populate("farm");
    if (!user || !user.farm) {
      return res.status(404).send({ message: "User not found" });
    }

    const profile = {
      name: user.name,
      address: user.address,
      phone: user.phone,
      farm: user.farm[0]._id,
    };

    res.status(200).json({ profile });
  } catch {
    res.status(500).send({ message: "Internal server error." });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await User.findById(userId).populate("farm");
    if (!user || !user.farm) {
      return res.status(404).send({ message: "User not found" });
    }

    user.name = req.body.name;
    user.address = req.body.address;
    user.phone = req.body.phone;

    await user.save();

    const updatedProfile = {
      name: user.name,
      address: user.address,
      phone: user.phone,
    };

    res.status(200).json({ profile: updatedProfile });
  } catch {
    res.status(500).send({ message: "Internal server error." });
  }
};
