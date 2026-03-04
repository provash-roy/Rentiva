import { getServerSession } from "next-auth";
import User from "@/models/user.model";
import { connectToDatabase } from "@/lib/mongoose";
import { authOptions } from "../api/auth/[...nextauth]/route";

export async function getCurrentUser() {
  await connectToDatabase();

  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return null;
  }

  const currentUser = await User.findOne({
    email: session.user.email,
  });

  return currentUser;
}
