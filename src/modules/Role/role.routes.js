const express = require("express");
const RoleController = require("./role.controller.js");
// const { AuthMiddleware } = require("../../app/middleware/Auth.js");

const router = express.Router();

// const auth = new AuthMiddleware();

router.post("/create-role", RoleController.create);
router.get("/", RoleController.read);

module.exports = { RoleRoutes: router };
