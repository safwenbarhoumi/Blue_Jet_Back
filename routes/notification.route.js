const controller = require("../controllers/notification.controller");
const { authJWT } = require("../middlewares");
const notificationRoute = require("express").Router();

notificationRoute.get("/notification/:id", controller.getnottifications);

module.exports = notificationRoute;
