import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      lowercase: true
    },
    email: {
      type: String,
      unique: true,
      trim: true
    },
    password: {
      type: String,
      trim: true
    },
  },
  {
    timestamps: true
  }
);

const User = mongoose.model("User", userSchema);

export default User;
