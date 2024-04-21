import { Router } from "express";
const router = new Router();
import deviceController from "../controllers/deviceController.js";
import checkRole from "../middleware/checkRoleMiddleware.js";

router.post("/", checkRole("ADMIN"), deviceController.create);
router.get("/", deviceController.getAll);
router.get("/:id", deviceController.getOne);

export default router;
