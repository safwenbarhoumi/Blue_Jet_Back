const controller = require("../controllers/user.controller");
const { authJWT } = require("../middlewares");
const userRoute = require("express").Router();

userRoute.get("/profile", controller.getProfile);
userRoute.post("/profile", controller.updateProfile);

module.exports = userRoute;
