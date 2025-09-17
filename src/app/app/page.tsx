import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from "@/drizzle/db";
import { JobInfoTable } from "@/drizzle/schema";
import { JobInfoForm } from "@/features/jobInfos/components/JobInfoForm";
import { getJobInfoUserTag } from "@/features/jobInfos/dbCache";
import { formatExperienceLevel } from "@/features/jobInfos/lib/formatters";
import { getCurrentUser } from "@/services/clerk/lib/getCurrentUser";
import { desc, eq } from "drizzle-orm";
import { ArrowRightIcon, Loader2Icon, PlusIcon } from "lucide-react";
import { cacheTag } from "next/dist/server/use-cache/cache-tag";
import Link from "next/link";
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

  return (
    <div className="container my-4 md:mt-12">
      <div className="flex gap-2 justify-between items-center mb-8">
        <h1 className="text-3xl md:text-4xl lg:text-5xl text-primary/80">
          Select a job description
        </h1>
        <Button asChild>
          <Link href="/app/job-infos/new">
            <PlusIcon />
            Create Job Description
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {jobInfos.map((jobInfo) => (
          <Link
            href={`/app/job-infos/${jobInfo.id}`}
            key={jobInfo.id}
            className="no-underline"
          >
            <Card className="h-full border hover:bg-transparent transition-colors duration-300">
              <div className="flex items-center justify-between h-full">
                <div className="space-y-4 h-full">
                  <CardHeader>
                    <CardTitle className="text-lg">{jobInfo.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="line-clamp-3 text-muted-foreground">
                    {jobInfo.description}
                  </CardContent>
                  <CardFooter className="flex gap-2">
                    <Badge variant="outline">
                      {formatExperienceLevel(jobInfo.experienceLevel)}
                    </Badge>
                    {jobInfo.title && (
                      <Badge variant="outline">{jobInfo.title}</Badge>
                    )}
                  </CardFooter>
                </div>
                <CardContent>
                  <ArrowRightIcon className="size-6" />
                </CardContent>
              </div>
            </Card>
          </Link>
        ))}
        <Link href="/app/job-infos/new" className="no-underline">
          <Card className="h-full flex items-center justify-center border-dashed border-2 bg-transparent hover:border-primary transition-colors duration-300">
            <div className="text-lg flex items-center gap-2 text-white/90">
              <PlusIcon className="size-6" />
              New Job Description
            </div>
          </Card>
        </Link>
      </div>
    </div>
  );
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