const express = require("express");
const userRoute = express();

const multer = require("multer");
const uploadConfig = require("../configs/upload");

const upload = multer(uploadConfig.MULTER);//Colocando as configurações do multer que fiz aq

const UserController = require("../controllers/UserController");
const userController = new UserController();
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

userRoute.post("/register", userController.create);
userRoute.put("/update", ensureAuthenticated, userController.update);
userRoute.patch("/avatar", ensureAuthenticated, upload.single("avatar"), userController.avatar);//upload,single("avatar") ele pega apenas o arquivo com aquele nome

module.exports = userRoute;