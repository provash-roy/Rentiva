import Listing from "@/models/listing.model";
import { connectToDatabase } from "@/lib/mongoose";

export default async function getListingById(id: string) {
  try {
    if (!id) throw new Error("Listing ID is required");

    await connectToDatabase();
    const listing = await Listing.findById(id)
      .populate("host", "name email image")
      .lean();

    if (!listing) return null;

    return JSON.parse(JSON.stringify(listing));
  } catch (error) {
    console.error(error);
    return null;
  }
}
