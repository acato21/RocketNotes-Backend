const express = require("express");
const routes = express();

const sessionsRoute = require("./sessions.routes");
const userRoute = require("./user.routes");
const noteRoute = require("../routes/notes.routes");

routes.use(express.json())

routes.use("/sessions", sessionsRoute);
routes.use("/user", userRoute);
routes.use("/note", noteRoute);

module.exports = routes;