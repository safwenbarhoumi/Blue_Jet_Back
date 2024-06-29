const controller = require("../controllers/activity");
//const { authJWT } = require("../middlewares");
const Route = require("express").Router();

Route.get("/activity/:farmId", controller.getActivityByFarmId);
//Route.post("/alarm", controller.updateAlarm);

module.exports = Route;
