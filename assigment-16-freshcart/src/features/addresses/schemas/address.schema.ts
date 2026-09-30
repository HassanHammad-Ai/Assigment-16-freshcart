import { z } from "zod";

export const addressSchema = z.object({
  name: z.string().min(2, "Please give this address a label, e.g. Home"),
  details: z.string().min(5, "Please provide more detail (street, building, apt.)"),
  phone: z.string().regex(/^01[0125][0-9]{8}$/, "Enter a valid Egyptian phone number"),
  city: z.string().min(2, "City is required"),
});

export type AddressFormValues = z.infer<typeof addressSchema>;
