import { NextResponse } from "next/server";
import Listing from "@/models/listing.model";
import { connectToDatabase } from "@/lib/mongoose";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectToDatabase();

    const { id } = await params;

    const listing = await Listing.findById(id).populate(
      "host",
      "name email image",
    );

    if (!listing) {
      return NextResponse.json(
        { message: "Listing not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: listing,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("GET LISTING BY ID ERROR:", error);

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
