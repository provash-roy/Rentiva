import { NextResponse } from "next/server";
import Listing from "@/models/Listing";
import { connectToDatabase } from "@/lib/mongoose";

export async function POST(req: Request) {
  await connectToDatabase();

  const body = await req.json();

  const listing = await Listing.create(body);

  return NextResponse.json(listing);
}
