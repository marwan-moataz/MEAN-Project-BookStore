const express = require("express");
const controller = require("../Controller/user.controller");
const router = express.Router();

router.post("/login", controller.loginController);

router.get("/user/:userId", controller.getUser);

router.post("/register", controller.registerController);

router.patch("/books/:userId/status", controller.bookStatusController);

module.exports = router;
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
