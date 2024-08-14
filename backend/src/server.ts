import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import userRouter from "./router/login.router";
import adminrouter from "./router/admin.router";

const app = express();

app.use("/uploads", express.static("uploads"));
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:4200"],
  })
);
app.use(bodyParser.json());

mongoose
  .connect(
    "mongodb+srv://ITI-MEAM:MEAM-TEAM@mean-bookstore.u9dxp.mongodb.net/mean-bookStore?retryWrites=true&w=majority&appName=MEAN-bookStore"
  )
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.use("/", userRouter);
app.use("/", adminrouter);

// app.post(
//   "/api/users",
//   asyncHandler(async (req, res) => {
//     const { email, name, password } = req.body;
//     const user = await User.findOne({ email });
//     if (user) {
//       res.status(400).send("User is already exist, please login!");
//       return;
//     }
//     const encryptedPassword = await bcrypt.hash(password, 10);
//   })
// );

const port = 4000;
app.listen(port, () => {
  console.log("website served on localhost:" + port);
});
