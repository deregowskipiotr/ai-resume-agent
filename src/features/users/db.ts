import { db } from "@/drizzle/db";
import { UserTable } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { revalidateUserCache } from "./dbCache";

export async function upsertUser(user: typeof UserTable.$inferInsert) {
  try {
    await db
      .insert(UserTable)
      .values(user)
      .onConflictDoUpdate({
        target: [UserTable.id],
        set: user,
      });
    console.log(`User upsert successful: ${user.id}`);
  } catch (error) {
    console.error(`Failed to upsert user with ID ${user.id}:`, error);
    throw error; // rethrow if you want higher-level handlers to catch it
  }

  revalidateUserCache(user.id);
}

export async function deleteUser(id: string) {
  try {
    await db.delete(UserTable).where(eq(UserTable.id, id));
    console.log(`User deletion successful: ${id}`);
  } catch (error) {
    console.error(`Failed to delete user with ID ${id}:`, error);
    throw error;
  }

  revalidateUserCache(id);
}
