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

// export const UserSchema = new Schema<User>(
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

// export const UserModel = model<User>("User", UserSchema);

import { Schema, model } from "mongoose";

// Define the userBook interface
export interface userBook {
  bookId: string;
  shelve: "read" | "want to read" | "reading" | null;
  rating: number;
  comment: string;
}

// Define the User interface
export interface User {
  id: string;
  email: string;
  password: any;
  confirmPassword: string;
  name: string;
  profilePicture: string;
  isAdmin: boolean;
  book: userBook[]; // Define the book field as an array of userBook objects
}

// Define the schema for userBook
const userBookSchema = new Schema<userBook>({
  bookId: { type: String, required: true },
  shelve: {
    type: String,
    enum: ["read", "want to read", "reading", null],
    default: null,
  },
  rating: { type: Number, default: 0 },
  comment: { type: String, default: "" },
});

// Define the schema for User
export const UserSchema = new Schema<User>(
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
export const UserModel = model<User>("User", UserSchema);
