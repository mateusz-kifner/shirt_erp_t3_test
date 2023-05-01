import { z } from "zod";

export const userSchema = z.object({
  id: z.number(),
  name: z.string().max(255),
  username: z.string().max(255).nullable().optional(),
  email: z.string().includes("@").max(255).nullable().optional(),
  emailVerified: z.boolean().default(false),
  password: z.string().max(60).nullable().optional(),
  image: z.string().max(4096).nullable().optional(),
});

export type UserType = z.infer<typeof userSchema>;
