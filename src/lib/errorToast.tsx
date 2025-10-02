import { Button } from "@/components/ui/button";
import Link from "next/link";
import { toast } from "sonner";

export const PLAN_LIMIT_MESSAGE = "PLAN_LIMIT";
export const RATE_LIMIT_MESSAGE = "RATE_LIMIT";

export function errorToast(message: string) {
  if ( message === PLAN_LIMIT_MESSAGE) {
    const toastId = toast.error(
      "Your plan has reached the limit of free requests. Please upgrade your plan to continue using this feature.",
      {
        action: (
          <Button size="sm" asChild onClick={() => {toast.dismiss(toastId)}}>
            <Link href="/app/upgrade">Upgrade</Link>
          </Button>
        )
      }
    )
  }

  if ( message === RATE_LIMIT_MESSAGE ) {
    toast.error("Woah! Slow down.", {
      description: "You are making too many requests. Please try again later."
    })
    return;
  }


  toast.error(message)
}