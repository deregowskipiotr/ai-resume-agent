import { getGlobalTag, getIdTag, getJobInfoTag } from "@/lib/dataCache";
import { revalidateTag } from "next/cache";

export function getInterviewGlobaTag() {
  return getGlobalTag("interviews")
}

export function getInterviewJobInfoTag(jobInfoId: string) {
  return getJobInfoTag("interviews", jobInfoId)
}

export function getInterviewIdTag(id: string) {
  return getIdTag("interviews", id)
}

export function revalidateInterviewCache({
  id,
  jobInfoId,
}: {
  id: string;
  jobInfoId: string;
}) {
  revalidateTag(getInterviewGlobaTag())
  revalidateTag(getInterviewJobInfoTag(jobInfoId))
  revalidateTag(getInterviewIdTag(id))
}