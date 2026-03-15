import getListingById from "@/actions/getListingById";
import ListingClient from "./ListingClient";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ListingPage({ params }: PageProps) {
  const { id } = await params;
  const listing = await getListingById(id);

  return (
    <div>
      <ListingClient listing={listing} />
    </div>
  );
}
