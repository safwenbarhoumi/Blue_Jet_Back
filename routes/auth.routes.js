const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/auth.controller");
const authJWT = require("../middlewares/authJWT");
const authRoute = require("express").Router();

authRoute.post(
  "/auth/signup",
  //[verifySignUp.checkDuplicatedphone, verifySignUp.checkRolesExisted],
  verifySignUp.checkDuplicatedphone,
  controller.signup
);
authRoute.post("/auth/signin", controller.signin);
authRoute.post("/auth/signout", authJWT, controller.signout);

module.exports = authRoute;
