const express = require("express");
const cors = require("cors");
const path = require("path");
const socketIo = require("socket.io");
const app = express();

const http = require("http");
const server = http.createServer(app);
const io = socketIo(server);

const cookieSession = require("cookie-session");
require("dotenv").config();

const { connectToMongoDB } = require("./Database/mongooseConnection");

const authJwt = require("./middlewares/authJWT");

const bodyParser = require("body-parser");
app.use(bodyParser.json({ limit: "10mb" }));

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
const langueRoute = require("./routes/language");
const activityRoute = require("./routes/activity");
const programRoute = require("./routes/program");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configure and use CORS middleware
const corsOptions = {
  origin: "http://192.168.43.44:9091",
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  optionsSuccessStatus: 200, // Some legacy browsers choke on 204
};

app.use(cors(corsOptions));

app.use(
  cookieSession({
    name: "erwini-session",
    keys: ["COOKIE_SECRET"],
    httpOnly: true,
  })
);

// Socket.IO connection
io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

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

// Define routes
app.use("/api", activityRoute);
app.use("/api", programRoute);
app.use("/api", langueRoute);
app.use("/api", authRoutes); //************** */
app.use("/api", agriculturalZonesRoute);
app.use("/api", alarmRoute);
app.use("/api", authJwt);
app.use("/api", userRoute);
app.use("/api", notificationRoute);
app.use("/api", sensorsRoute);
app.use("/api", pumpsRoute);
app.use("/api", wellsRoute);
app.use("/api", valvesRoute);
app.use("/api", farmRoute);
app.use("/api", stegRoutes);
app.use("/api", notificationRoutes);
app.use("/api", mapsRoutes);
app.use("/api", contactRoute);

// Export the modules
module.exports = { app, server, io };
