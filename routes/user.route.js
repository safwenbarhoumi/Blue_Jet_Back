const controller = require("../controllers/user.controller");
const { authJWT } = require("../middlewares");
const userRoute = require("express").Router();
const upload = require("../middlewares/upload");

userRoute.get("/profile", controller.getProfile);
userRoute.post("/profile", upload.single("image"), controller.updateProfile);
//userRoute.post("/profile", controller.updateProfile);

module.exports = userRoute;
