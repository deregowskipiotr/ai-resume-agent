"use client";

import React, { useEffect, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Shadcn UI imports
import { Input } from "@/components/ui/input";
//import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormField,
} from "@/components/ui/form";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { experienceLevels, JobInfoTable } from "@/drizzle/schema/jobInfo";
import { formatExperienceLevel } from "../lib/formatters";
import { LoadingSwap } from "@/components/ui/loading-swap";
import { createJobInfo, updateJobInfo } from "../actions";
import { toast } from "sonner";


// Experience level enum
{/*export enum JobExperienceLevel {
  JUNIOR = "junior",
  MID = "mid-level",
  SENIOR = "senior",
} */}

// Zod schema
const FormSchema = z.object({
  name: z.string().min(2, "Name is required"),
  jobTitle: z.string().nullable(),
  experienceLevel: z.enum(experienceLevels),
  description: z.string().min(2, "Description is required"),
});

type FormValues = z.infer<typeof FormSchema>;

export function JobInfoForm({ jobInfo } : {
  jobInfo?: Pick< 
    typeof JobInfoTable.$inferSelect,
    "id" | "name" | "title" | "experienceLevel" | "description"
  >
}
  
) {
  const [mouted, setMouted] = useState(false);
  useEffect(() => setMouted(true), []);


  const form = useForm<FormValues>({
    
    resolver: zodResolver(FormSchema),
    defaultValues: jobInfo ?? {
      name: "",
      jobTitle: null,
      experienceLevel: undefined,
      description: "",
    },
  });

  if (!mouted) return null; // Avoid hydration issues

  async function onSubmit(values: FormValues) {
    //console.log("Form Values:", values);
    const action = jobInfo ? updateJobInfo.bind(null, jobInfo.id) : createJobInfo;
    const res = await action(values);
    
    if (res?.error) {
      toast.error(res.message);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Your name" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Job Title & Experience Level row */}
        <div className="flex flex-col gap-6 md:flex-row sm:gap-4">
          <FormField
            control={form.control}
            name="jobTitle"
            render={({ field }) => (
              <FormItem className="w-full md:w-[75%]">
                <FormLabel>Job Title </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={field.value ?? ""}
                    onChange={(e) => field.onChange(e.target.value || null)}
                    placeholder="e.g. Senior Sowtware Engineer or Full Stack Developer..."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="experienceLevel"
            render={({ field }) => (
              <FormItem className="w-full md:w-[25%]">
                <FormLabel>Experience Level</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {experienceLevels.map((level) => (
                      <SelectItem key={level} value={level}>
                        {formatExperienceLevel(level)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Describe the job requirements, responsibilities, and any other relevant details..."
                />
              </FormControl>
              <FormMessage className="mt-2">
                <span>
                  Be as specific as possible. the more information you provide,
                  the better the interviews will be.
                </span>
              </FormMessage>
            </FormItem>
          )}
        />

        {/* No action/submit logic as per instruction */}
        <Button
          disabled={form.formState.isSubmitting}
          type="submit"
          variant={"default"}
          className=" w-full"
        >
          <LoadingSwap isLoading={form.formState.isSubmitting}>
            Save Job Information
          </LoadingSwap>
        </Button>
      </form>
    </Form>
  );
}
