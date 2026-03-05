import mongoose, { Schema } from "mongoose";
import { IReview } from "@/types/review.types";

const reviewSchema = new Schema<IReview>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    listing: {
      type: Schema.Types.ObjectId,
      ref: "Listing",
      required: true,
    },

    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },

    comment: {
      type: String,
    },

    hostReply: {
      type: String,
    },
  },
  { timestamps: true },
);

export default mongoose.model<IReview>("Review", reviewSchema);
