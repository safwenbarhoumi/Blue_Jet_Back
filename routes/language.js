const controller = require("../controllers/language");
// const { authJWT } = require("../middlewares");
const Route = require("express").Router();

Route.get("/langue/:id", controller.getLanguageType);
Route.post("/langue/:id", controller.updateTypeLanguage);

module.exports = Route;
