const controller = require("../controllers/alarm.controller");
const { authJWT } = require("../middlewares");
const alarmRoute = require("express").Router();

alarmRoute.get("/alarm/:farmId", controller.getAlarmByFarmId);
alarmRoute.post("/alarm/:farmId", controller.updateAlarm);
alarmRoute.post("/alarmSchedule/:farmId", controller.createAlarmSchedule);

module.exports = alarmRoute;
