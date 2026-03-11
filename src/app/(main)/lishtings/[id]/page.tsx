import getLishtingById from "@/actions/getLishtingById";

export default async function LishtingPage({
  params,
}: {
  params: { id: string };
}) {
  const listing = await getLishtingById({ params });

  return (
    <div>
      <h1>{listing.title}</h1>
      <p>{listing.description}</p>
    </div>
  );
}
