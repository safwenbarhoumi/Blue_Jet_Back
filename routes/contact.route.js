const controller = require("../controllers/contact.controller");
const { authJWT } = require("../middlewares");
const contactRoute = require("express").Router();

contactRoute.post("/contact", controller.addContact);

module.exports = contactRoute;
