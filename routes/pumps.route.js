const controller = require("../controllers/pumps.controller");
const { authJWT } = require("../middlewares");
const pumpsRoute = require("express").Router();

pumpsRoute.get("/pumps", controller.getPumps);
pumpsRoute.post("/updatepump", controller.updatePump);
pumpsRoute.post("/resetPump", controller.resetPump);
pumpsRoute.post("/createPumpSchedule", controller.createPumpSchedule);
pumpsRoute.get("/getPumpSchedule", controller.getPumpSchedule);
// to add controller to open pump directly

module.exports = pumpsRoute;
