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

  const existingBooking = await Booking.findOne({
    listing,
    checkIn: { $lte: checkOut },
    checkOut: { $gte: checkIn },
  });

  if (existingBooking) {
    return NextResponse.json(
      { message: "Listing already booked for these dates" },
      { status: 400 },
    );
  }

  const bookings = await Booking.create({
    user: user._id,
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
