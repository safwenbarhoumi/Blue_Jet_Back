const controller = require("../controllers/sensors.controller");
const { authJWT } = require("../middlewares");
const sensorsRoute = require ("express").Router()



sensorsRoute.get("/sensors", controller.getSensors)


module.exports = sensorsRoute
