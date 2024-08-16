import { Schema, model } from "mongoose";

export interface AdminUser {
  email: string;
  password: string;
}

export const AdminSchema = new Schema<AdminUser>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
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

export const AdminModel = model<AdminUser>("Admin", AdminSchema);
