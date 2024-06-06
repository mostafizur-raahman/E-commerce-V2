const express = require("express");

const UserController = require("./user.controller.js");
const AuthMiddleware = require("../../app/middleware/Auth.js");

const router = express.Router();

router.post("/create-user", UserController.create);
router.get("/", AuthMiddleware.handle, UserController.read);
router.post("/login", UserController.login);

module.exports = { UserRoutes: router };
