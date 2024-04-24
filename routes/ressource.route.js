const { authJWT } = require("../middlewares");
const controller = require("../controllers/ressource.controller");

module.exports = function (app) {
  /*----------------------------------------Embedded system API------------------------------------------------------------*/
  app.post("/api/wells/", controller.getwellstate);
  app.post("/api/vannes", controller.getvannestate);
  app.post("/api/pumpes", controller.getpumpestate);
  app.post("/api/addcapteur", controller.postcapteur);
  app.post("/api/postcourant", controller.postcourant);
  app.post("/api/postcourantpump", controller.postcourantpumpe);
  app.post("/api/reset", controller.reset);
  app.post("/api/currentvanne", controller.postcurrentvanne);
  app.post("/api/currentpump", controller.postcurrentpumpe);
  app.post("/api/currentwell", controller.postcurrentwell);
  //app.post("/api/alarme", controller.getalarme);
  app.post("/api/poststatepump", controller.postetatpumpe);
  app.post("/api/poststatewell", controller.postetatwell);
  app.post("/api/poststatevanne", controller.postetatvanne);

 
};
