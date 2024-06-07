const { Router } = require("express");

const { RoleRoutes } = require("../../modules/Role/role.routes.js");
const { UserRoutes } = require("../../modules/User/user.route.js");
const { CategoryRoutes } = require("../../modules/Category/category.route.js");

const router = Router();

router.use("/roles", RoleRoutes);
router.use("/users", UserRoutes);
router.use("/category", CategoryRoutes);

module.exports = router;
