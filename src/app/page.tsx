"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useListings from "./hooks/useListings";

export default function Home() {
  const { listings, loading, error } = useListings();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!listings.length) return <p>No listings found</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {listings.map((listing) => (
        <Card key={listing._id} className="rounded-2xl overflow-hidden">
          <CardContent>
            <CardHeader>
              <CardTitle className="font-semibold">
                {listing.category}
              </CardTitle>
            </CardHeader>
            <p>{listing.description}</p>
            <p className="mt-2 text-sm text-gray-500">
              Guests: {listing.guests}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
