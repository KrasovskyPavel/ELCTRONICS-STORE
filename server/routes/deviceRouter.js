import { Router } from "express";
const router = new Router();
import deviceController from "../controllers/deviceController.js";

router.post("/", deviceController.create);
router.get("/", deviceController.getAll);
router.get("/:id", deviceController.getOne);

export default router;
