import { z } from "zod";

export const shippingAddressSchema = z.object({
  details: z.string().min(5, "Please provide more detail (street, building, apt.)"),
  phone: z
    .string()
    .regex(/^01[0125][0-9]{8}$/, "Enter a valid Egyptian phone number, e.g. 01012345678"),
  city: z.string().min(2, "City is required"),
});

export type ShippingAddressFormValues = z.infer<typeof shippingAddressSchema>;
