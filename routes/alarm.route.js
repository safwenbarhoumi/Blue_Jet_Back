const controller = require("../controllers/alarm.controller");
const { authJWT } = require("../middlewares");
const alarmRoute = require("express").Router();

alarmRoute.get("/alarm", controller.getAlarm);
alarmRoute.post("/alarm", controller.updateAlarm);

module.exports = alarmRoute;
