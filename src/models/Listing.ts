import mongoose from "mongoose";

const ListingSchema = new mongoose.Schema({
  category: String,
  location: {
    value: String,
    label: String,
    lat: Number,
    lng: Number,
  },
  description: String,
  imageSrc: String,
  guestCount: Number,
  price: Number,
}, { timestamps: true });

export default mongoose.models.Listing ||
  mongoose.model("Listing", ListingSchema);