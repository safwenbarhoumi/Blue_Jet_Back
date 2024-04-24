const controller = require("../controllers/steg.controller");
const { authJWT } = require("../middlewares");
const stegRoute = require("express").Router();

stegRoute.post("/steg", controller.controlledBySteg);

module.exports = stegRoute;
