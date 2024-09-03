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
      image: user.image, // Include image in the response
      farm: user.farm[0]._id,
    };

    res.status(200).json({ profile });
  } catch {
    res.status(500).send({ message: "Internal server error." });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    console.log("update profile function !");
    const userId = req.userId;

    const user = await User.findById(userId).populate("farm");
    if (!user || !user.farm) {
      return res.status(404).send({ message: "User not found" });
    }

    // Check each field and update if it exists in the request
    if (req.body.name !== undefined) {
      user.name = req.body.name;
    }
    if (req.body.address !== undefined) {
      user.address = req.body.address;
    }
    if (req.body.phone !== undefined) {
      user.phone = req.body.phone;
    }
    if (req.file) {
      user.image = req.file.path; // Save the file path to the database
    }
    console.log("user name  ", user.name);
    console.log("body name  ", req.body.name);

    await user.save();

    const updatedProfile = {
      name: user.name,
      address: user.address,
      phone: user.phone,
      image: user.image,
    };

    res.status(200).json({ profile: updatedProfile });
  } catch {
    res.status(500).send({ message: "Internal server error." });
  }
};
