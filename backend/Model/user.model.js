// import { Schema, model } from "mongoose";

// export interface userBook {
//   bookId: string;
//   shelve: "read" | "want to read" | "reading" | null;
//   rating: number;
//   comment: string;
// }
// export interface User {
//   id: string;
//   email: string;
//   password: any;
//   confirmPassword: string;
//   name: string;
//   profilePicture: string;
//   isAdmin: boolean;
//   book: any;
// }

// export const UserSchema = new Schema(
//   {
//     name: { type: String, required: true },
//     email: { type: String, Number, required: true, unique: true },
//     password: { type: String, Number, required: true },
//     confirmPassword: { type: String, required: true },
//     isAdmin: { type: Boolean, required: true },
//     profilePicture: { type: String, required: true },
//   },
//   {
//     timestamps: true,
//     toJSON: {
//       virtuals: true,
//     },
//     toObject: {
//       virtuals: true,
//     },
//   }
// );

// export const UserModel = model("User", UserSchema);

const { Schema, model } = require("mongoose");

// Define the userBook interface
// export interface userBook {
//   bookId: string;
//   shelve: "read" | "want to read" | "reading" | null;
//   rating: number;
//   comment: string;
// }

// // Define the User interface
// export interface User {
//   id: string;
//   email: string;
//   password: any;
//   confirmPassword: string;
//   name: string;
//   profilePicture: string;
//   isAdmin: boolean;
//   book: userBook[]; // Define the book field as an array of userBook objects
// }

// Define the schema for userBook
const userBookSchema = new Schema({
  bookId: { type: String },
  shelve: {
    type: String,
    enum: ["read", "want to read", "reading", null],
    default: null,
  },
});

// Define the schema for User
const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    confirmPassword: { type: String, required: true },
    isAdmin: { type: Boolean, required: true },
    profilePicture: { type: String, required: true },
    book: { type: [userBookSchema], default: [] }, // Add the book field using the userBook schema
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

// Create and export the UserModel
const UserModel = model("User", UserSchema);

module.exports = { UserModel };
