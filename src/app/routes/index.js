const { Router } = require("express");

const { RoleRoutes } = require("../../modules/Role/role.routes.js");
const { UserRoutes } = require("../../modules/User/user.route.js");
const { CategoryRoutes } = require("../../modules/Category/category.route.js");
const { ProductRoutes } = require("../../modules/Product/product.route.js");

const router = Router();

router.use("/roles", RoleRoutes);
router.use("/users", UserRoutes);
router.use("/category", CategoryRoutes);
router.use("/products", ProductRoutes);

module.exports = router;
