import { NextResponse } from "next/server";
import Listing from "@/models/listing.model";
import { connectToDatabase } from "@/lib/mongoose";

export async function POST(req: Request) {
  await connectToDatabase();

  const body = await req.json();

  const listing = await Listing.create(body);

  return NextResponse.json(listing);
}

export async function GET() {
  await connectToDatabase();

  const listings = await Listing.find().sort({ createdAt: -1 });
  return NextResponse.json(listings);
}
