import { z } from "zod";

export const customerSchema = z.object({
    name: z
        .string()
        .trim()
        .min(2, "Customer name is required"),

    email: z
        .string()
        .email("Invalid email"),

    phone: z
        .string()
        .min(11, "Phone is required"),

    address: z
        .string()
        .trim()
        .min(5, "Address is required"),
});

export type CustomerFormValues =
    z.infer<typeof customerSchema>;