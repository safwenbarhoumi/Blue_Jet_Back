const controller = require("../controllers/farm.controller");
const { authJWT } = require("../middlewares");
const farmRoute = require ("express").Router()


farmRoute.get("/culture", controller.getCulture)


module.exports = farmRoute