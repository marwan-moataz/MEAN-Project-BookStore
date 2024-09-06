const { Schema, model } = require("mongoose");

const userBookSchema = new Schema({
  bookId: { type: String },
  shelve: {
    type: String,
    enum: ["read", "want to read", "reading", null],
    default: null,
  },
});

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    confirmPassword: { type: String, required: true },
    isAdmin: { type: Boolean, required: true },
    profilePicture: { type: String, required: true },
    book: { type: [userBookSchema], default: [] },
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

const UserModel = model("User", UserSchema);

module.exports = { UserModel };
