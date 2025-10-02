import { BackLink } from "@/components/BackLink";
import { Alert } from "@/components/ui/alert";
import { PricingTable } from "@/services/clerk/components/PricingTable";
import { AlertTriangle } from "lucide-react";

//import { PricingTable } from "@/services/clerk/components/PricingTable";
export default function UpgradePage() {
  return (
    <div>
      <div>
        <BackLink href="/app">Dashboard</BackLink>
      </div>

      <div>
        <Alert variant="destructive">
          <AlertTriangle />
          <span>
            You have reached the limit of free trials. You need to upgrade your plan to access this feature.
          </span>
        </Alert>

        <PricingTable />
      </div>
    </div>
  )
}