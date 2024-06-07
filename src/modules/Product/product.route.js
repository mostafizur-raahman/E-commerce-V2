const express = require("express");
const productController = require("./product.controller");

const router = express.Router();

router.post("/create-product", productController.create);
router.get("/", productController.read);

module.exports = { ProductRoutes: router };
