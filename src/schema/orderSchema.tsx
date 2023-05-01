import { z } from "zod";
import { addressSchema } from "./addressSchema";
import { clientSchema } from "./clientSchema";

export const orderSchema = z.object({
  id: z.number(),
  name: z.string().max(255),
  status: z.string().max(255).nullable().optional(),
  notes: z.string().nullable().optional(),
  price: z.string().max(255).nullable().optional(),
  isPricePaid: z.boolean().default(false),
  dateOfCompletion: z.date().nullable().optional(),
  tables: z.string().max(16384).nullable().optional(),
  designs: z.string().max(16384).nullable().optional(),
  workTime: z.number().max(16384).nullable().optional(),
  client: clientSchema,
  address: addressSchema,
});

export type OrderType = z.infer<typeof orderSchema>;
