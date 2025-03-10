import { z } from "zod";
import "dotenv/config";

const envSchema = z.object({
  NEXT_PUBLIC_BASE_URL: z.string(),
});

export const env = envSchema.parse({
  NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
});
