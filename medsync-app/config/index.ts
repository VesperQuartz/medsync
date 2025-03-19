import { z } from 'zod';

const envSchema = z.object({
  EXPO_PUBLIC_BASE_URL: z.string(),
});

export const env = envSchema.parse({
  EXPO_PUBLIC_BASE_URL: process.env.EXPO_PUBLIC_BASE_URL,
});
