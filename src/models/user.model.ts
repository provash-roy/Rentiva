import mongoose, { Schema, models, model } from "mongoose";
import { IUser } from "../types/user.types";

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
    },

    image: {
      type: String,
    },

    role: {
      type: String,
      enum: ["guest", "host", "admin"],
      default: "guest",
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    wishlist: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Listing",
      },
    ],
  },
  { timestamps: true },
);

export default models.User || model<IUser>("User", userSchema);
