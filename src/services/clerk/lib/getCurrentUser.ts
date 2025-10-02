import { db } from "@/drizzle/db";
import { UserTable } from "@/drizzle/schema";
import { getUserIdTag } from "@/features/users/dbCache";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { cacheTag } from "next/dist/server/use-cache/cache-tag";

export async function getCurrentUser({ allData = false } = {}) {
  const { userId, redirectToSignIn } = await auth();

  return {
    userId,
    redirectToSignIn,
    user: allData && userId != null ? await getUser(userId) : undefined,
  };
}

async function getUser(id: string) {
  "use cache";
  cacheTag(getUserIdTag(id));

  try {
    console.log(`Fetching user with ID: ${id}`);
    const user = await db.query.UserTable.findFirst({
      where: eq(UserTable.id, id),
    });
    console.log(`User found:`, user);
    return user;
  } catch (error) {
    console.error(`Error fetching user with ID ${id}:`, error);
    return undefined;
  }
}

