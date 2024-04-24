const controller = require("../controllers/wells.controller");
const { authJWT } = require("../middlewares");
const wellRouter = require("express").Router();

wellRouter.get("/wells", controller.getAllWells);
wellRouter.post("/updateWell", controller.updateWell);
wellRouter.post("/resetWell", controller.resetAllWells);

module.exports = wellRouter;
