import Listing from "@/models/listing.model";
import { connectToDatabase } from "@/lib/mongoose";

export default async function getListings() {
  try {
    await connectToDatabase();
    const listings = await Listing.find()
      .populate("host", "name email image")
      .sort({ createdAt: -1 })
      .lean();
    return JSON.parse(JSON.stringify(listings));
  } catch (error) {
    console.error(error);
    return [];
  }
}
