interface IParams {
  params: {
    id: string;
  };
}

export default async function getLishtingById({ params }: IParams) {
  const lishting = await fetch(`/api/listings/${params.id}`);
  const data = await lishting.json();

  if (!lishting.ok) {
    throw new Error(data.message || "Failed to fetch listing");
  }

  return data;
}
