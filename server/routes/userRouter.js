import { Router } from "express";
const router = new Router();
import userController from "../controllers/userController.js";

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/auth", userController.check);

export default router;
