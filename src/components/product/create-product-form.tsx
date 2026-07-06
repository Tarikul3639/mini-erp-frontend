import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { toast } from "sonner";

import ProductFields from "./product-fields";

import {
    productSchema,
    type ProductFormValues,
} from "@/lib/validations/product.schema";

import { useCreateProductMutation } from "@/redux/features/product/productApi";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
} from "@/components/ui/card";

export default function CreateProductForm() {
    const navigate = useNavigate();

    const [image, setImage] =
        useState<File | null>(null);

    const [
        createProduct,
        { isLoading },
    ] = useCreateProductMutation();

    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<ProductFormValues>({
        resolver:
            zodResolver(productSchema),
    });

    const onSubmit = async (
        values: ProductFormValues
    ) => {
        try {
            const formData =
                new FormData();

            formData.append(
                "name",
                values.name
            );

            formData.append(
                "sku",
                values.sku
            );

            formData.append(
                "category",
                values.category
            );

            formData.append(
                "purchasePrice",
                values.purchasePrice.toString()
            );

            formData.append(
                "sellingPrice",
                values.sellingPrice.toString()
            );

            formData.append(
                "stockQuantity",
                values.stockQuantity.toString()
            );

            if (image) {
                formData.append(
                    "image",
                    image
                );
            }

            await createProduct(
                formData
            ).unwrap();

            toast.success(
                "Product created successfully"
            );

            reset();

            setImage(null);

            navigate("/products");
        } catch (error: any) {
            toast.error(
                error?.data?.message ??
                    "Failed to create product"
            );
        }
    };

    return (
        <Card>
            <CardContent className="p-6">
                <form
                    onSubmit={handleSubmit(
                        onSubmit
                    )}
                    className="space-y-6"
                >
                    <ProductFields
                        register={
                            register
                        }
                        control={
                            control
                        }
                        errors={
                            errors
                        }
                        image={image}
                        setImage={
                            setImage
                        }
                    />

                    <div className="flex justify-end gap-3">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() =>
                                navigate(
                                    "/products"
                                )
                            }
                        >
                            Cancel
                        </Button>

                        <Button
                            type="submit"
                            disabled={
                                isLoading
                            }
                        >
                            {isLoading
                                ? "Creating..."
                                : "Create Product"}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}