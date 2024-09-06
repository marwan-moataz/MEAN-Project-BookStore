import { Router } from "express";
import controller from "../Controller/user.controller";

const router = Router();

router.post("/login", controller.loginController);

router.post("/register", controller.registerController);

router.get("/books/:bookId", controller.getBook);

router.patch("/books/:userId/status", controller.bookStatusController);

export default router;
