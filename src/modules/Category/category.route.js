const express = require("express");
const CategoryController = require("./category.controller.js");

const router = express.Router();

router.post("/create-category", CategoryController.create);
router.get("/", CategoryController.read);

module.exports = { CategoryRoutes: router };
