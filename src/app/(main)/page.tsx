"use client";

import ListingCard from "@/components/listings/ListingCard";
import axios from "axios";
import { useEffect, useState } from "react";

interface Listing {
  _id: string;
  category: string;
  title: string;
  description: string;
  pricePerNight: number;
  images: string[];
  host?: { name?: string; email?: string };
  location?: { city?: string; country?: string };
}

export default function Home() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("/api/listings")
      .then((res) => setListings(res.data.data))
      .catch((err) => setError("Failed to load listings"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!listings.length) return <p>No listings found</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {listings.map((listing) => (
        <ListingCard key={listing._id} listing={listing} />
      ))}
    </div>
  );
}
