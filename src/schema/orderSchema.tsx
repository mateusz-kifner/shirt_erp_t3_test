import { z } from "zod";
import { addressSchema } from "./addressSchema";
import { clientSchema } from "./clientSchema";
import { fileSchema } from "./fileSchema";
import { typeDesignSchema } from "./typeDesignSchema";
import { typeSpreadsheetSchema } from "./typeSpreadsheetSchema";

export const orderSchema = z.object({
  id: z.number(),
  name: z.string().max(255),
  status: z.string().max(255).nullable().optional(),
  notes: z.string().nullable().optional(),
  price: z.string().max(255).nullable().optional(),
  isPricePaid: z.boolean().default(false),
  dateOfCompletion: z.date().nullable().optional(),
  spreadsheets: z.array(typeSpreadsheetSchema),
  designs: z.array(typeDesignSchema),
  files: z.array(fileSchema),
  workTime: z.number().max(16384).nullable().optional(),
  client: clientSchema,
  address: addressSchema,
});

export type OrderType = z.infer<typeof orderSchema>;
