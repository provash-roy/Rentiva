"use client";

import { Heart, Star } from "lucide-react";

interface ListingCardProps {
  listing: {
    _id: string;
    title: string;
    pricePerNight: number;
    images: string[];
    location?: { city?: string; country?: string };
    rating?: number;
  };
}

export default function ListingCard({ listing }: ListingCardProps) {
  return (
    <div className="border-none rounded-2xl shadow-md cursor-pointer hover:scale-[1.02] transition">
      {/* Image */}
      <div className="relative w-full h-48 rounded-2xl overflow-hidden">
        <img
          src={listing.images?.[0] || "/placeholder.jpg"}
          alt={listing.title}
          className="object-cover"
        />

        {/* Heart Icon */}
        <button className="absolute top-3 right-3 bg-white/80 backdrop-blur rounded-full p-1">
          <Heart size={20} />
        </button>
      </div>

      {/* Content */}
      <div className="space-y-1 p-2">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-sm">{listing.title}</h3>

          <div className="flex items-center gap-1 text-sm">
            <Star size={14} fill="black" />
            {listing.rating || 0.0}
          </div>
        </div>
        <div>
          <p className="text-sm text-gray-500">
            {" "}
            {listing.location?.city || "Rangpur"},{" "}
            {listing.location?.country || "Bangladesh"}
          </p>

          <p className="text-sm ">
            <span className="font-semibold">${listing.pricePerNight}</span> per
            night
          </p>
        </div>
      </div>
    </div>
  );
}
