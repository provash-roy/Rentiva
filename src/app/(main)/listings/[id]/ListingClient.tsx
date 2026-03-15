"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { differenceInDays, addDays } from "date-fns";
import { MapPin, Star, Users, Home } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DateRange } from "react-day-picker";
import axios from "axios";

interface ListingClientProps {
  listing: any;
  currentUser?: any;
}

export default function ListingClient({
  listing,
  currentUser,
}: ListingClientProps) {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 3),
  });

  const dayCount = useMemo(() => {
    if (dateRange?.from && dateRange?.to) {
      const days = differenceInDays(dateRange.to, dateRange.from);
      return days > 0 ? days : 1;
    }
    return 1;
  }, [dateRange]);

  const totalPrice = dayCount * listing.pricePerNight;

  const handleReserve = async () => {
    try {
      console.log("currentUser:", currentUser);

      if (!currentUser) return;

      const reservationData = {
        listing: listing._id,
        checkIn: dateRange?.from,
        checkOut: dateRange?.to,
      };

      await axios.post("/api/reservation", reservationData);
      console.log("hello");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in zoom-in duration-500">
      {/* Title & Stats */}
      <div className="flex flex-col gap-2 mb-6">
        <h1 className="text-3xl font-bold tracking-tight text-neutral-900">
          {listing.title}
        </h1>
        <div className="flex items-center text-sm text-neutral-500 gap-4">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-emerald-500 fill-emerald-500" />
            <span className="font-medium text-neutral-900">
              {listing.averageRating || "New"}
            </span>
            {listing.reviewCount > 0 && (
              <span>({listing.reviewCount} reviews)</span>
            )}
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4 text-neutral-400" />
            <span className="underline cursor-pointer">
              {/* {listing.location.city}, {listing.location.country} */}
              Hello
            </span>
          </div>
        </div>
      </div>

      {/* Hero Images Grid */}
      <div className="w-full h-[60vh] max-h-[500px] mb-8 rounded-2xl overflow-hidden grid grid-cols-4 grid-rows-2 gap-2">
        {listing.images && listing.images.length > 0 ? (
          <>
            <div className="col-span-4 md:col-span-2 row-span-2 relative cursor-pointer group">
              {/* <Image
                src={listing.images[0]}
                alt="Main Listing Image"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              /> */}
              <img
                src={listing.images[0]}
                alt="Main Listing Image"
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            {listing.images.slice(1, 5).map((image: string, index: number) => (
              <div
                key={index}
                className="hidden md:block col-span-1 row-span-1 relative cursor-pointer group"
              >
                <Image
                  src={image}
                  alt={`Listing Image ${index + 1}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </>
        ) : (
          <div className="col-span-4 row-span-2 bg-neutral-100 flex items-center justify-center">
            <span className="text-neutral-400">No images provided</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-7 gap-10">
        {/* Listing Main Description */}
        <div className="md:col-span-4 flex flex-col gap-8">
          {/* Host Info */}
          <div className="flex items-center justify-between pb-6 border-b">
            <div className="flex flex-col text-neutral-900">
              <h2 className="text-xl font-semibold">
                Hosted by {listing.host?.name || "Anonymous"}
              </h2>
              <div className="flex items-center gap-4 text-neutral-500 mt-1 font-light">
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>{listing.maxGuests} guests</span>
                </div>
                {listing.category && (
                  <div className="flex items-center gap-1">
                    <Home className="w-4 h-4" />
                    <span>{listing.category}</span>
                  </div>
                )}
              </div>
            </div>
            <Avatar className="h-14 w-14">
              <AvatarImage src={listing.host?.image} />
              <AvatarFallback className="bg-emerald-100 text-emerald-800 text-lg">
                {listing.host?.name?.[0] || "?"}
              </AvatarFallback>
            </Avatar>
          </div>

          <div className="text-neutral-600 font-light leading-relaxed mb-4">
            {listing.description}
          </div>

          {/* Calendar Picker for Mobile & Descriptive */}
          <div className="pb-6 border-b">
            <h2 className="text-xl font-semibold mb-4">Select your dates</h2>
            <div className="overflow-x-auto p-4 border rounded-xl bg-white shadow-sm inline-block">
              <Calendar
                mode="range"
                selected={dateRange}
                onSelect={setDateRange}
                numberOfMonths={2}
                disabled={(date) =>
                  date < new Date() || date < new Date("1900-01-01")
                }
                className="rounded-md"
              />
            </div>
            {dateRange?.from && dateRange?.to && (
              <p className="mt-4 text-emerald-600 font-medium">
                {dayCount} {dayCount === 1 ? "night" : "nights"} selected.
              </p>
            )}
          </div>
        </div>

        {/* Sidebar Reservation Card */}
        <div className="md:col-span-3">
          <div className="sticky top-24 bg-white border border-neutral-200 shadow-xl rounded-2xl p-6 flex flex-col gap-4">
            <div className="flex items-center gap-1">
              <span className="text-2xl font-bold">
                ${listing.pricePerNight}
              </span>
              <span className="text-neutral-500 font-light text-lg">
                / night
              </span>
            </div>

            <div className="border border-neutral-200 rounded-xl overflow-hidden mt-4">
              <div className="flex w-full divide-x divide-neutral-200 border-b border-neutral-200">
                <div className="flex-1 p-3 flex flex-col">
                  <span className="text-xs font-bold uppercase text-neutral-800">
                    Check-in
                  </span>
                  <span className="text-sm text-neutral-600 whitespace-nowrap overflow-hidden text-ellipsis">
                    {dateRange?.from
                      ? dateRange.from.toLocaleDateString()
                      : "Add date"}
                  </span>
                </div>
                <div className="flex-1 p-3 flex flex-col">
                  <span className="text-xs font-bold uppercase text-neutral-800">
                    Checkout
                  </span>
                  <span className="text-sm text-neutral-600 whitespace-nowrap overflow-hidden text-ellipsis">
                    {dateRange?.to
                      ? dateRange.to.toLocaleDateString()
                      : "Add date"}
                  </span>
                </div>
              </div>
              <div className="p-3">
                <span className="text-xs font-bold uppercase text-neutral-800">
                  Guests
                </span>
                <div className="text-sm text-neutral-600 mt-1">1 guest</div>
              </div>
            </div>

            <Button
              size="lg"
              className="w-full mt-2 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white rounded-xl shadow-md transition-all font-semibold"
              onClick={handleReserve}
            >
              Reserve
            </Button>

            <span className="text-center text-sm text-neutral-400 mt-2 font-light">
              You won't be charged yet
            </span>

            <div className="flex items-center justify-between text-neutral-600 mt-4">
              <span className="underline">
                ${listing.pricePerNight} x {dayCount} nights
              </span>
              <span>${totalPrice}</span>
            </div>
            <div className="flex items-center justify-between text-neutral-600 mt-2">
              <span className="underline">Cleaning fee</span>
              <span>$45</span>
            </div>
            <div className="flex items-center justify-between text-neutral-600 mt-2">
              <span className="underline">Service fee</span>
              <span>$60</span>
            </div>

            <hr className="my-4" />

            <div className="flex items-center justify-between font-bold text-lg text-neutral-900">
              <span>Total before taxes</span>
              <span>${totalPrice + 45 + 60}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
