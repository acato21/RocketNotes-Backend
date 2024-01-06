const express = require("express");
const userRoute = express();

const UserController = require("../controllers/UserController");
const userController = new UserController();
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

userRoute.post("/create", userController.create);
userRoute.post("/update", ensureAuthenticated, userController.update);

module.exports = userRoute;