import { Router } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { AdminModel } from "../models/adminUser";

const router = Router();
router.post("/admin", async (req, res) => {
  const { email, password } = req.body;
  const user = await AdminModel.findOne({ email, password });

  // if (!user) {
  //   return res.status(401).json({ message: "Invalid credentials" });
  // }

  // const isPasswordValid = await bcrypt.compare(password, user.password);

  if (user) {
    res.send(generateTokenResponse(user));
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

const generateTokenResponse = (user: any) => {
  const token = jwt.sign({ email: user.email }, "someRandomText", {
    expiresIn: "30d",
  });
  user.token = token;
  return user;
};

export default router;
