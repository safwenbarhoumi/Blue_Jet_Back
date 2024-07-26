const controller = require("../controllers/agriculturalZones.controller");
const { authJWT } = require("../middlewares");
const zoneRoute = require("express").Router();

zoneRoute.get("/zone", controller.getZoneDetails);
zoneRoute.get("/zoneByFarmId/:farmId", controller.getZoneDetailsByFarmId);
zoneRoute.post(
  "/updateValveNameById/:zoneId/:valveId",
  controller.updateValveNameById
);
zoneRoute.post(
  "/updatePumpNameByZoneId/:zoneId",
  controller.updatePumpNameByZoneId
);
zoneRoute.post(
  "/updateNameWellByZoneId/:zoneId",
  controller.updateNameWellByZoneId
);

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
zoneRoute.get("/getLocations/:farmId", controller.getLocations);
zoneRoute.get(
  "/getSensorsByZoneId/:zoneId/:sensorId",
  controller.getSensorsByZoneId
);
zoneRoute.post("/resetAll", controller.resetAll);
zoneRoute.post("/updateLocationByFarmId", controller.updateLocationByFarmId);
zoneRoute.post(
  "/updateLocationByZoneId/:zoneId",
  controller.updateLocationByZoneId
);

zoneRoute.get("/getWaterByZoneId/:zoneId", controller.getWaterByZoneId);

// hardware :
zoneRoute.post("/stateWellById", controller.stateWellById);
zoneRoute.post("/updateHardwareWellByZoneId", controller.updatHardwareWellById);

zoneRoute.post("/statePumpByZoneId", controller.statePumpByZoneId);
zoneRoute.post("/updateHardwarePumpById", controller.updateHardwarePumpById);

zoneRoute.post("/stateValveById", controller.stateValveById);
zoneRoute.post("/updateHardwareValveById", controller.updateHardwareValveById);

zoneRoute.post("/updateMesureByZoneId", controller.updateMesureByZoneId);

zoneRoute.post("/resetAll", controller.resetAll);

zoneRoute.post("/updateStateSTEGByZoneId", controller.updateStateSTEGByZoneId);

zoneRoute.get("/getFarmsWithDetails", controller.getFarmsWithDetails);

zoneRoute.get("/getFarmDetailIdByPhone", controller.getFarmDetailIdByPhone);

module.exports = zoneRoute;
