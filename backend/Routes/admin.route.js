const express = require("express");

const controller = require("../Controller/user.controller");
const router = express.Router();

router.post("/admin", controller.adminController);

module.exports = router;
