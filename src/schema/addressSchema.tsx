import { z } from "zod";

export const addressSchema = z
  .object({
    streetName: z.string().max(255).nullable().optional(),
    streetNumber: z.string().max(255).nullable().optional(),
    apartmentNumber: z.string().max(255).nullable().optional(),
    secondLine: z.string().max(255).nullable().optional(),
    postCode: z.string().max(255).nullable().optional(),
    city: z.string().max(255).nullable().optional(),
    province: z.string().max(255).nullable().optional(),
  })
  .nullable()
  .optional();

export type AddressType = z.infer<typeof addressSchema>;
