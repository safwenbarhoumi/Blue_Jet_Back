const Contact = require("../models/contact.model");
const User = require("../models/user.model");
const nodemailer = require("nodemailer");

/*
// Create a transporter with your email configuration
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com", // Your SMTP host
  port: 587, // Your SMTP port
  secure: false, // true for 465, false for other ports
  auth: {
    user: "barhoumis490@gmail.com", // Your email
    pass: "passwordssss", // Your password
  },
});*/

exports.addContact = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await User.findById(userId).populate("farm");
    if (!user || !user.farm) {
      return res.status(404).send({ message: "User not found" });
    }

    const newContact = new Contact({
      fullname: req.body.fullname,
      address_mail: req.body.address_mail,
      message: req.body.message,
      farm: user.farm[0]._id,
    });

    const savedContact = await newContact.save();

    // Send email notification
    /*await transporter.sendMail({
      from: req.body.adress_mail, // sender address
      to: "safwen.barhoumi@esprit.tn", // list of receivers
      subject: `New message from ${req.body.fullname}`, // Subject line
      text: req.body.message, // Plain text body
    });*/

    res.status(200).send(savedContact);
  } catch (err) {
    res.status(500).send({ message: err.message || "some error occurred" });
  }
};
