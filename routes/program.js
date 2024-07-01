const controller = require("../controllers/program");
//const { authJWT } = require("../middlewares");
const Route = require("express").Router();

Route.get("/program/:farmId", controller.getProgramByFarmId);
//Route.post("/alarm", controller.updateAlarm);

module.exports = Route;
