import { z } from "zod";

export const typeSpreadsheetSchema = z.object({
  id: z.number(),
  name: z.string().max(1024).nullable().optional(),
  data: z.string(),
});

export type SpreadsheetType = z.infer<typeof typeSpreadsheetSchema>;
