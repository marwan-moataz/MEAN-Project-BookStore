import { Schema, model } from "mongoose";

export interface userBook {
  bookId: string;
  shelve: "read" | "want to read" | "reading" | null;
  rating: number;
  comment: string;
}
export interface User {
  id: string;
  email: string;
  password: any;
  confirmPassword: string;
  name: string;
  profilePicture: string;
  isAdmin: boolean;
  book: userBook;
}

export const UserSchema = new Schema<User>(
  {
    name: { type: String, required: true },
    email: { type: String, Number, required: true, unique: true },
    password: { type: String, Number, required: true },
    confirmPassword: { type: String, required: true },
    isAdmin: { type: Boolean, required: true },
    profilePicture: { type: String, required: true },
    book: { type: Array },
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

export const UserModel = model<User>("User", UserSchema);
