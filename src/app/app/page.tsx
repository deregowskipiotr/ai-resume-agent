import { Card, CardContent } from "@/components/ui/card";
import { db } from "@/drizzle/db";
import { JobInfoTable } from "@/drizzle/schema";
import { JobInfoForm } from "@/features/jobInfos/components/JobInfoForm";
import { getJobInfoUserTag } from "@/features/jobInfos/dbCache";
import { getCurrentUser } from "@/services/clerk/lib/getCurrentUser";
import { desc, eq } from "drizzle-orm";
import { Loader2Icon } from "lucide-react";
import { cacheTag } from "next/dist/server/use-cache/cache-tag";
import { Suspense } from "react";

export default function AppPage() {
  return (
    <Suspense
      fallback={
        <div className="h-screen-header flex items-center justify-center">
          <Loader2Icon className="size-24 animate-spin" />
        </div>
      } 
    >
      <JobInfos />
    </Suspense>
  )
}

async function JobInfos() {
  const { userId, redirectToSignIn } = await getCurrentUser();
  if ( userId == null ) return redirectToSignIn();

  const jobInfos = await getJobInfos(userId);

  if (jobInfos.length === 0) {
    return <NoJobsInfos />
  }

  return null;
}

function NoJobsInfos() {
  return <div className="container my-4 md:mt-14 max-w-5xl">
    <h1 className="text-3xl md:text-4xl lg:text-5xl mb-8 text-center text-primary/80">Welcome to AI Resume Agent!</h1>
    <p className="text-muted-foreground mb-8">To get started, enter information about the type of job you are looking for. 
      This can be specific information copied from a job offer or a general description of the position you are interested in (e.g. Tech Stack or Senior Developer...)
      The more specific the information you provide, the better tailored the interview questions will be.
    </p>
    <Card>
      <CardContent>
        <JobInfoForm /> 
      </CardContent>
    </Card>
  </div>
}

async function getJobInfos(userId: string) {
  "use cache"
  cacheTag(getJobInfoUserTag(userId))
  return db.query.JobInfoTable.findMany({
    where: eq(JobInfoTable.userId, userId),
    orderBy: desc(JobInfoTable.updatedAt),
  })
}