import { Router } from "express";
import controller from "../Controller/user.controller";

const router = Router();

router.post("/login", controller.loginController);

router.post("/register", controller.registerController);

router.get("/books/:bookId", controller.getBook);

router.patch("/books/:userId/status", controller.bookStatusController);

export default router;
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     console.log("multer");
//     cb(null, "./uploads/profile_pictures");
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${new Date()}-file.originalname`);
//     console.log("hello joo");
//   },
// });

// const upload = multer({ storage });
