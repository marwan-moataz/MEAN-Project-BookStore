import { Router } from "express";
import { User } from "../models/user.model";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/user.model";
import bcrypt from "bcrypt";

const router = Router();
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (isPasswordValid) {
    res.send(generateTokenResponse(user));
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

router.post("/register", async (req, res) => {
  const { name, email, password, address } = req.body;
  const user = await UserModel.findOne({ email });

  if (user) {
    res.status(400).send("user is already exist, please login");
    return;
  }
  const encryptedPassword = await bcrypt.hash(password, 10);

  const newUser: User = {
    id: "",
    name,
    email: email.toLowerCase(),
    password: encryptedPassword,
    address,
    isAdmin: false,
  };
  const dbUser = await UserModel.create(newUser);
  res.send(generateTokenResponse(dbUser));
});

const generateTokenResponse = (user: any) => {
  const token = jwt.sign({ email: user.email }, "someRandomText", {
    expiresIn: "30d",
  });
  user.token = token;
  return user;
};
export default router;
