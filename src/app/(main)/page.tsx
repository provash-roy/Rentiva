import getListings from "@/actions/getListings";
import ListingCard from "@/components/listings/ListingCard";
import Link from "next/link";

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

export default async function Home() {
  const listings = await getListings();

  if (!listings) return <p>No listings found</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {listings.map((listing: Listing) => (
        <Link href={`/listings/${listing._id}`} key={listing._id}>
          <ListingCard listing={listing} />
        </Link>
      ))}
    </div>
  );
}
