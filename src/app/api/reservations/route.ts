import { NextResponse } from "next/server";
import { getCurrentUser } from "@/actions/getCurrentUser";
import { connectToDatabase } from "@/lib/mongoose";
import Reservation from "@/models/reservation.model";
import Listing from "@/models/listing.model";
import { differenceInDays } from "date-fns";

export async function POST(req: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.error();
  }

  await connectToDatabase();

  const { listing, checkIn, checkOut } = await req.json();

  if (!listing || !checkIn || !checkOut) {
    return NextResponse.json(
      { message: "Missing required fields" },
      { status: 400 },
    );
  }

  // double booking check
  const existingBooking = await Reservation.findOne({
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

  // listing fetch
  const listingData = await Listing.findById(listing);

  if (!listingData) {
    return NextResponse.json({ message: "Listing not found" }, { status: 404 });
  }

  // nights calculate
  const nights = differenceInDays(new Date(checkOut), new Date(checkIn));

  const dayCount = nights > 0 ? nights : 1;

  // fees
  const cleaningFee = 45;
  const serviceFee = 60;

  // total price calculation
  const totalPrice =
    dayCount * listingData.pricePerNight + cleaningFee + serviceFee;

  const reservations = await Reservation.create({
    user: user._id,
    listing,
    checkIn,
    checkOut,
    totalPrice,
  });

  if (!reservations) {
    return NextResponse.json(
      { message: "Failed to create booking" },
      { status: 500 },
    );
  }

  return NextResponse.json(
    { success: true, data: reservations },
    { status: 201 },
  );
}
