import express from "express";
import RoleController from "./role.controller.js";
// import { AuthMiddleware } from "../../app/middleware/Auth.js";

const router = express.Router();

// const auth = new AuthMiddleware();

router.post("/create-role", RoleController.create);
router.get("/", RoleController.read);

export const RoleRoutes = router;
