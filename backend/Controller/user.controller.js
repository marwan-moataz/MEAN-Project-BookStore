const { UserModel } = require("../Model/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { AdminModel } = require("../Model/admin.model"); // <---
const { Books } = require("../Model/books.model");

const loginController = async (req, res) => {
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

const strongPasswordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

const validatePassword = (password) => {
  return strongPasswordPattern.test(password);
};

const registerController = async (req, res) => {
  const { name, email, password, confirmPassword, profilePicture } = req.body;
  const user = await UserModel.findOne({ email });

  console.log(strongPasswordPattern.test(password));

  if (user) {
    res.status(400).json({ message: "user is already exist, please login" });
    return;
  } else if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords don't match" });
  }
  if (!validatePassword(password)) {
    return res.status(400).json({
      message:
        "Password must be at least eight characters, at least one letter and one number.",
    });
  }
  const encryptedPassword = await bcrypt.hash(password, 10);

  const newUser = {
    id: "",
    name,
    email: email.toLowerCase(),
    password: encryptedPassword,
    confirmPassword: encryptedPassword,
    profilePicture,
    isAdmin: false,
    book: [],
  };
  const dbUser = await UserModel.create(newUser);
  res.send(generateTokenResponse(dbUser));
};

// const bookStatusController = async (req, res) => {
//   const { userId } = req.params;
//   const { shelve, bookId } = req.body;

//   try {
//     let user = await UserModel.findById(userId);
//     if (!user) {
//       return res
//         .status(404)
//         .json({ status: "fail", message: "Book not found" });
//     }
//     console.log(user);

//     const oldbook = user.book.find((item: any) => {
//       item.bookId === bookId;
//     });
//     console.log(oldbook);

//     user.book = oldbook;
//     await user.save();

//     res.json({ status: "success", data: user });
//   } catch (err) {
//     console.log(err);
//     res
//       .status(500)
//       .json({ status: "error", message: "Error updating book status" });
//   }
// };

const bookStatusController = async (req, res) => {
  const { userId } = req.params;
  const { shelve, bookId } = req.body;

  try {
    let user = await UserModel.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ status: "fail", message: "User not found" });
    }

    const oldbook = user.book.find((item) => item.bookId === bookId);

    if (user.book.length === 0 || !oldbook) {
      const newBook = {
        bookId,
        shelve,
      };

      user.book.push(newBook);
      await user.save();

      return res.status(200).json({
        status: "success",
        message: "Your Book is added successfully ",
      });
    }

    oldbook.shelve = shelve;
    await user.save();

    res.json({ status: "success", data: user });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ status: "error", message: "Error updating book status" });
  }
};

const getBook = async (req, res) => {
  const bookId = req.params.bookId;
  console.log(bookId);

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

const adminController = async (req, res) => {
  const { email, password } = req.body;
  const user = await AdminModel.findOne({ email, password });

  if (user) {
    res.send(generateTokenResponse(user));
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
};

const generateTokenResponse = (user) => {
  const token = jwt.sign({ email: user.email }, "someRandomText", {
    expiresIn: "30d",
  });
  user.token = token;
  return user;
};

module.exports = {
  loginController,
  registerController,
  bookStatusController,
  getBook,
  adminController,
};
