const express = require("express");
const userRoute = express();

const multer = require("multer");
const uploadConfig = require("../configs/upload");

const upload = multer(uploadConfig.MULTER);

const UserController = require("../controllers/UserController");
const userController = new UserController();
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

userRoute.post("/register", userController.create);
userRoute.post("/update", ensureAuthenticated, userController.update);
userRoute.patch("/avatar", ensureAuthenticated, upload.single("avatar"), userController.avatar);

module.exports = userRoute;