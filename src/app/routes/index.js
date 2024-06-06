const { Router } = require("express");
// const { UserRoutes } = require("../../modules/user/user.route.js");
const { RoleRoutes } = require("../../modules/Role/role.routes.js");
const { UserRoutes } = require("../../modules/User/user.route.js");

const router = Router();

// router.use("/users", UserRoutes);
router.use("/roles", RoleRoutes);
router.use("/users", UserRoutes);

module.exports = router;
