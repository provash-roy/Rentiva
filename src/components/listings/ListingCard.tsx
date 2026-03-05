"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ListingCardProps {
  listing: {
    _id: string;
    category: string;
    title: string;
    description: string;
    pricePerNight: number;
    images: string[];
    host?: { name?: string; email?: string };
    location?: { city?: string; country?: string };
  };
}

export default function ListingCard({ listing }: ListingCardProps) {
  return (
    <Card key={listing._id} className="rounded-2xl overflow-hidden shadow-lg">
      {listing.images && listing.images.length > 0 && (
        <img
          src={listing.images[0]}
          alt={listing.title}
          className="w-full h-48 object-cover"
        />
      )}
      <CardHeader>
        <CardTitle className="font-semibold">{listing.title}</CardTitle>
        <p className="text-sm text-gray-500">{listing.category}</p>
      </CardHeader>
      <CardContent>
        <p>{listing.description}</p>
        <p className="mt-2 font-medium">${listing.pricePerNight} per night</p>
        {listing.host && (
          <p className="mt-1 text-sm text-gray-600">
            Hosted by: {listing.host.name || listing.host.email}
          </p>
        )}
        {listing.location && (
          <p className="text-sm text-gray-500">
            Location: {listing.location.city}, {listing.location.country}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
