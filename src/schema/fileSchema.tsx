import { z } from "zod";

export const fileSchema = z.object({
  id: z.number(),
  size: z.number(),
  filepath: z.string().max(2048),
  originalFilename: z.string().max(1024).nullable().optional(),
  newFilename: z.string().max(1024).nullable().optional(),
  mimetype: z.string().max(40).nullable().optional(),
  hash: z.string().max(40).nullable().optional(),
  token: z.string().max(40).nullable().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
  createdById: z.number().nullable().optional(),
  updatedById: z.number().nullable().optional(),
});

export type FileType = z.infer<typeof fileSchema>;
