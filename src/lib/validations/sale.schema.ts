import { z } from "zod";

export const saleSchema = z.object({
    customer: z.string().min(1, "Customer is required"),

    products: z
        .array(
            z.object({
                product: z.string().min(1, "Product is required"),

                quantity: z.number().min(1, "Quantity is required"),
            })
        )
        .min(1, "At least one product is required"),
});

export type SaleFormValues = z.infer<typeof saleSchema>;