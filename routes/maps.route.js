const controller = require("../controllers/maps.controller");
const { authJWT } = require("../middlewares");
const mapRoute = require("express").Router();

mapRoute.get("/zoneLocalisation", controller.getZoneLocalization);
mapRoute.get("/fermLocalisation", controller.getFermLocalization);
mapRoute.get("/Localisation", controller.getLocalisation);

module.exports = mapRoute;
