import { Router } from "express";
import { User } from "../models/user.model";
import jwt from "jsonwebtoken";
import { UserModel, userBook } from "../models/user.model";
import bcrypt from "bcrypt";
import multer from "multer";

const router = Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (isPasswordValid) {
    const userData = {
      email: user.email,
      id: user.id,
      name: user.name,
      book: user.book,
      profilePicture: user.profilePicture,
      token: generateTokenResponse(user),
    };
    res.send(generateTokenResponse(userData));
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

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

router.post("/register", async (req, res) => {
  const { name, email, password, profilePicture } = req.body;
  const user = await UserModel.findOne({ email });

  if (user) {
    res.status(400).json({ message: "user is already exist, please login" });
    return;
  }
  const encryptedPassword = await bcrypt.hash(password, 10);

  const newUser: User = {
    id: "",
    name,
    email: email.toLowerCase(),
    password: encryptedPassword,
    confirmPassword: encryptedPassword,
    profilePicture,
    isAdmin: false,
    book: {
      bookId: "",
      shelve: null,
      rating: 0,
      comment: "",
    } as userBook,
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
