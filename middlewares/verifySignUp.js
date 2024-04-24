const db = require("../models");

const ROLES = db.ROLES;
const User = db.user;

/* checkDuplicatedphone = async (req, res, next) => {
  phone = req.body.phone;
  try {
    const user = await findOne({ phone: phone });
    console.log("user", user);

    if (user) {
      res.status(400).send({ message: "Failed! phone is already in use!" });
      return;
    }
  } catch (err) {
    console.error(err);
    return;
  }

  next();
}; */
const checkDuplicatedphone = async (req, res, next) => {
  try {
    const { phone } = req.body;
    // Check if the phone number already exists in the database
    const existingUser = await User.findOne({ phone });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Phone number already registered" });
    }
    // If the phone number is unique, continue with the registration process
    next();
  } catch (error) {
    console.error("Error in checkDuplicatePhone middleware:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// checkRolesExisted = (req, res, next) => {
//     if (req.body.roles) {
//         for (let i = 0; i < req.body.roles.length; i++) {
//             if (!ROLES.includes(req.body.roles[i])) {
//                 res.status(400).send({
//                     message: `Failed! Role ${req.body.roles[i]} does not exist!`
//                 });
//                 return;
//             }
//         }
//     }

//     next();
// };

const verifySignUp = {
  checkDuplicatedphone,
  //   checkRolesExisted,
};

module.exports = verifySignUp;
