const controller = require("../controllers/agriculturalZones.controller");
const { authJWT } = require("../middlewares");
const zoneRoute = require("express").Router();

zoneRoute.get("/zone", controller.getZoneDetails);
zoneRoute.get("/getPumpByZoneId/:farmId/:zoneId", controller.getPumpsById);
zoneRoute.post("/updatePumpByZoneId/:id", controller.updatePumpById);
zoneRoute.get("/getWellByZoneId/:id", controller.getWellById);
zoneRoute.post("/updateWellByZoneId/:id", controller.updateWellById);
zoneRoute.get("/getAllValvesByZoneId/:id", controller.getAllValvesByZoneId);
zoneRoute.post("/updateValveById/:zoneId/:valveId", controller.updateValveById);
zoneRoute.post(
  "/updateAllValvesByZoneId/:id",
  controller.updateAllValvesByZoneId
);
zoneRoute.get("/getLocations", controller.getLocations);
zoneRoute.get("/getSensorsByZoneId/:id", controller.getSensorsByZoneId);
zoneRoute.post("/resetAll", controller.resetAll);

// hardware :
zoneRoute.post("/stateWellById", controller.stateWellById);
zoneRoute.post("/updateHardwareWellByZoneId", controller.updatHardwareWellById);

module.exports = zoneRoute;
