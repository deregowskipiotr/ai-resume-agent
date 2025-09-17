import { experienceLevels } from "@/drizzle/schema";
import z from "zod";

export const jobInfoSchema = z.object({
  name: z.string().min(2, "Name is required"),
  jobTitle: z.string().nullable(),
  experienceLevel: z.enum(experienceLevels),
  description: z.string().min(2, "Description is required"),

});