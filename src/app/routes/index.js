import { Router } from "express";
// import { UserRoutes } from "../../modules/user/user.route.js";
import { RoleRoutes } from "../../modules/Role/role.routes.js";
import { UserRoutes } from "../../modules/User/user.route.js";

const router = Router();

// router.use("/users", UserRoutes);
router.use("/roles", RoleRoutes);
router.use("/users", UserRoutes);

export default router;
