const express = require("express");
const routes = express();

const sessionsRoute = require("./sessions.routes");
const userRoute = require("./user.routes");

routes.use(express.json())

routes.use("/sessions", sessionsRoute);
routes.use("/user", userRoute);

module.exports = routes;