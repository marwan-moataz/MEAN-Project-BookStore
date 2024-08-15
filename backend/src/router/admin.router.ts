import { Router } from "express";
import controller from "../controller/controller";

const router = Router();
router.post("/admin", controller.adminController);

export default router;

// if (!user) {
//   return res.status(401).json({ message: "Invalid credentials" });
// }

// const isPasswordValid = await bcrypt.compare(password, user.password);
