import { getGlobalTag, getIdTag } from "@/lib/dataCache";
import { revalidateTag } from "next/cache";

export function getUserGlobaTag() {
  return getGlobalTag("users")
}

export function getUserIdTag(id: string) {
  return getIdTag("users", id)
}

export function revalidateUserCache(id: string) {
  revalidateTag(getUserGlobaTag())
  revalidateTag(getUserIdTag(id))
}