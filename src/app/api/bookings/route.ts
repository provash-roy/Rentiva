import { NextResponse } from "next/server";
import { getCurrentUser } from "@/actions/getCurrentUser";
import { connectToDatabase } from "@/lib/mongoose";
import Booking from "@/models/booking.model";

export async function POST(req: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.error();
  }

  await connectToDatabase();
  const { listing, checkIn, checkOut, totalPrice } = await req.json();

  if (!listing || !checkIn || !checkOut || !totalPrice) {
    return NextResponse.json(
      { message: "Missing required fields" },
      { status: 400 },
    );
  }
  // user._id,

  const bookings = await Booking.create({
    user: "65e89b23b7c8d1c123456789",
    listing,
    checkIn,
    checkOut,
    totalPrice,
  });

  if (!bookings) {
    return NextResponse.json(
      { message: "Failed to create booking" },
      { status: 500 },
    );
  }

  return NextResponse.json({ success: true, data: bookings }, { status: 201 });
}
