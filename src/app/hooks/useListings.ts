import { useEffect, useState } from "react";
import axios from "axios";

export interface Listing {
  _id: string;
  category: string;
  description: string;
  image: string;
  guests: number;
  createdAt: string;
}

const useListings = () => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchListings = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/listings");
      setListings(data);
    } catch (err: any) {
      setError(err.message || "Failed to fetch listings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListings();
  }, []);

  return { listings, loading, error, refetch: fetchListings };
};

export default useListings;
