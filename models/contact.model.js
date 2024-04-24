const mongoose = require("mongoose");
const contactSchema = new mongoose.Schema({
  fullname: {
    type: String,
  },
  address_mail: {
    type: String,
  },
  message: {
    type: String,
  },
  farm: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Farm",
    },
  ],
});

module.exports = mongoose.model("Contact", contactSchema);
