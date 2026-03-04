import mongoose from "mongoose";

export interface IUser {
  name: string;
  email: string;
  password?: string;
  image?: string;
  role: "guest" | "host" | "admin";
  isVerified: boolean;
  wishlist: mongoose.Types.ObjectId[];
}
