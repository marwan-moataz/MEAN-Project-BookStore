const express = require("express");

const controller = require("../Controller/user.controller");
const router = express.Router();

router.post("/admin", controller.adminController);

module.exports = router;

// if (!user) {
//   return res.status(401).json({ message: "Invalid credentials" });
// }

// const isPasswordValid = await bcrypt.compare(password, user.password);
