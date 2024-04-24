const mongoose = require("mongoose");

const User = mongoose.model(
    "User",
    new mongoose.Schema({
        name: String,
        phone: String,
        password: String,
        address: String,
        farm: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Farm"
            }
        ]
    })
);

module.exports = User;
