const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
const cookieSession = require("cookie-session");
require("dotenv").config();

const { connectToMongoDB } = require("./Database/mongooseConnection");

const authJwt = require("./middlewares/authJWT");

// agriculteur routes
const userRoute = require("./routes/user.route");
const notificationRoute = require("./routes/notification.route");
const alarmRoute = require("./routes/alarm.route");
const sensorsRoute = require("./routes/sensors.route");
const pumpsRoute = require("./routes/pumps.route");
const agriculturalZonesRoute = require("./routes/agricutulralZone.route");
const wellsRoute = require("./routes/wells.route");
const valvesRoute = require("./routes/valves.route");
const farmRoute = require("./routes/farm.route");
const authRoutes = require("./routes/auth.routes");
const stegRoutes = require("./routes/steg.route");
const notificationRoutes = require("./routes/notification.route");
const mapsRoutes = require("./routes/maps.route");
const contactRoute = require("./routes/contact.route");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.ALLOWED_ORIGIN,
    credentials: true,
  })
);

app.use(
  cookieSession({
    name: "erwini-session",
    keys: ["COOKIE_SECRET"],
    httpOnly: true,
  })
);

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

connectToMongoDB();

app.get("/", (req, res) => {
  res.json({ message: "Welcome to ERWINI application." });
});
const PORT = process.env.PORT || 9090;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

//agriculteur middelwares
app.use("/api", authRoutes);

app.use("/api", authJwt);
app.use("/api", userRoute);
app.use("/api", notificationRoute);
app.use("/api", alarmRoute);
app.use("/api", sensorsRoute);
app.use("/api", pumpsRoute);
app.use("/api", agriculturalZonesRoute);
app.use("/api", wellsRoute);
app.use("/api", valvesRoute);
app.use("/api", farmRoute);
app.use("/api", stegRoutes);
app.use("/api", notificationRoutes);
app.use("/api", mapsRoutes);
app.use("/api", contactRoute);

//admin middelwares
