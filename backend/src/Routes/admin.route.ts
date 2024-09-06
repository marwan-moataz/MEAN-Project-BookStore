import { Router } from "express";
import controller from "../Controller/user.controller";

const router = Router();
router.post("/admin", controller.adminController);

export default router;


