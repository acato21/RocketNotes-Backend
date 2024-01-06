const express = require("express");
const sessionsRoute = express();

const SessionsController = require("../controllers/SessionsController");
const sessionsController = new SessionsController();


sessionsRoute.post("/", sessionsController.create);

module.exports = sessionsRoute;