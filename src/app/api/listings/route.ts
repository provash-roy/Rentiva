import { NextResponse } from "next/server";
import Listing from "@/models/listing.model";
import { connectToDatabase } from "@/lib/mongoose";
import { getCurrentUser } from "@/actions/getCurrentUser";

export async function POST(req: Request) {
  try {
    await connectToDatabase();

    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    const {
      category,
      title,
      description,
      pricePerNight,
      images,
      maxGuests,
      location,
    } = body;

   
    if (
      !category ||
      !title ||
      !description ||
      !pricePerNight ||
      !images ||
      !maxGuests
    ) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 },
      );
    }

    const newListing = await Listing.create({
      category,
      title,
      description,
      pricePerNight,
      images,
      maxGuests,
      location,
      host: currentUser._id, 
    });

    return NextResponse.json(
      {
        success: true,
        data: newListing,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("CREATE LISTING ERROR:", error);

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}


export async function GET() {
  try {
    await connectToDatabase();

    const listings = await Listing.find()
      .populate("host", "name email image")
      .sort({ createdAt: -1 });

    return NextResponse.json(
      {
        success: true,
        count: listings.length,
        data: listings,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("GET LISTINGS ERROR:", error);

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
