import { z } from "zod";

import { ProductCategory } from "@/types/product";

export const productSchema = z.object({
    name: z
        .string()
        .trim()
        .min(2, "Product name is required"),

    sku: z
        .string()
        .trim()
        .min(2, "SKU is required"),

    category: z.nativeEnum(ProductCategory),

    purchasePrice: z
        .number()
        .min(0, "Purchase price must be at least 0"),

    sellingPrice: z
        .number()
        .min(0, "Selling price must be at least 0"),

    stockQuantity: z
        .number()
        .min(0, "Stock quantity must be at least 0"),
});

export type ProductFormValues = z.infer<
    typeof productSchema
>;