import mongoose, { Schema, models, model } from "mongoose";
import { IListing } from "@/types/listing.types";

const listingSchema = new Schema<IListing>(
  {
    category: String,

    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    pricePerNight: {
      type: Number,
      required: true,
    },

    location: {
      country: String,
      city: String,
      address: String,
      lat: Number,
      lng: Number,
    },

    images: [String],

    maxGuests: {
      type: Number,
      required: true,
    },

    host: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    averageRating: {
      type: Number,
      default: 0,
    },

    reviewCount: {
      type: Number,
      default: 0,
    },

    isApproved: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

export default models.Listing || model<IListing>("Listing", listingSchema);
