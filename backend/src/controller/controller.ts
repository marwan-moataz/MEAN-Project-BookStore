import { Request, Response } from "express";
import { UserModel } from "../models/user.model";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User, userBook } from "../models/user.model";
import { Books } from "../models/books.model";
import { AdminModel } from "../models/adminUser";

const loginController = async (req: Request, res: Response) => {
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
};

const strongPasswordPattern =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const validatePassword = (password: string): boolean => {
  return strongPasswordPattern.test(password);
};

const registerController = async (req: Request, res: Response) => {
  const { name, email, password, confirmPassword, profilePicture } = req.body;
  const user = await UserModel.findOne({ email });

  if (user) {
    res.status(400).json({ message: "user is already exist, please login" });
    return;
  } else if (password !== confirmPassword) {
    res.status(400).json({ message: "Passwords don't match" });
  }
  if (!validatePassword(password)) {
    return res.status(400).json({
      message:
        "Password must be at least 8 characters long and include uppercase letters, lowercase letters, digits, and special characters.",
    });
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
};

const bookStatusController = async (req: Request, res: Response) => {
  const { bookId } = req.params;
  const { shelve } = req.body;

  try {
    const book = await Books.findById(bookId);
    if (!book) {
      return res
        .status(404)
        .json({ status: "fail", message: "Book not found" });
    }

    book.shelve = shelve;
    await book.save();

    res.json({ status: "success", data: book });
  } catch (err) {
    res
      .status(500)
      .json({ status: "error", message: "Error updating book status" });
  }
};

const getBook = async (req: Request, res: Response) => {
  const bookId = req.params.bookId;
  try {
    const book = await Books.findById(bookId);

    if (!book) {
      res.json({ status: "fail", data: { book }, message: "book not found" });
    } else {
      res.json({ status: "success", data: { book } });
    }
  } catch (err) {
    res.status(500).json({ status: "error", message: "incorrect Id Format" });
  }
};

const adminController = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await AdminModel.findOne({ email, password });

  if (user) {
    res.send(generateTokenResponse(user));
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
};

const generateTokenResponse = (user: any) => {
  const token = jwt.sign({ email: user.email }, "someRandomText", {
    expiresIn: "30d",
  });
  user.token = token;
  return user;
};

export default {
  loginController,
  registerController,
  bookStatusController,
  getBook,
  adminController,
};
