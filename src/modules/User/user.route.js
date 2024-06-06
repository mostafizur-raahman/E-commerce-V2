import express from "express";

import UserController from "./user.controller.js";
import roleController from "../Role/role.controller.js";

// import { AuthMiddleware } from "../../app/middleware/Auth.js";

const router = express.Router();

// const auth = new AuthMiddleware();

router.post("/create-user", UserController.create);
router.get("/", roleController.read);

export const UserRoutes = router;
