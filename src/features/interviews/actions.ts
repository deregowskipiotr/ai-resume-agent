"use server"

import { getCurrentUser } from "@/services/clerk/lib/getCurrentUser"

export async function createInterview ({ jobInfoId }: {jobInfoId: string}) {
  const { userId } = await getCurrentUser()
  if ( userId == null ) {
    return {
      error: true,
      messages: "You don't have permission to do that."
    }
  } 

  //Permissions
  // Rate Limit
  // Job Info

  //create interview in the database
}