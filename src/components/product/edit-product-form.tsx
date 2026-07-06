import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { toast } from "sonner";

import ProductFields from "./product-fields";

import {
    productSchema,
    type ProductFormValues,
} from "@/lib/validations/product.schema";

import {
    useGetProductQuery,
    useUpdateProductMutation,
} from "@/redux/features/product/productApi";

import {
    Card,
    CardContent,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import PageLoader from "@/components/common/page-loader";

export default function EditProductForm() {
    const navigate = useNavigate();

    const { id } = useParams();

    const [image, setImage] =
        useState<File | null>(null);

    const {
        data: product,
        isLoading,
    } = useGetProductQuery(id!);

    const [
        updateProduct,
        {
            isLoading:
                isUpdating,
        },
    ] = useUpdateProductMutation();

    const {
        register,
        control,
        handleSubmit,
        reset,
        formState: {
            errors,
        },
    } = useForm<ProductFormValues>({
        resolver:
            zodResolver(productSchema),
    });

    useEffect(() => {
        if (!product) return;

        reset({
            name: product.name,
            sku: product.sku,
            // product.category may be a string from the API; cast to the form's category union
            category: product.category as ProductFormValues["category"],
            purchasePrice: product.purchasePrice,
            sellingPrice: product.sellingPrice,
            stockQuantity: product.stockQuantity,
        });
    }, [product, reset]);

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

            await updateProduct({
                id: id!,
                body: formData,
            }).unwrap();

            toast.success(
                "Product updated successfully"
            );

            navigate("/products");
        } catch (error: any) {
            toast.error(
                error?.data?.message ??
                    "Failed to update product"
            );
        }
    };

    if (isLoading) {
        return <PageLoader />;
    }

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

                    {product?.image && (
                        <div className="space-y-2">
                            <p className="text-sm font-medium">
                                Current Image
                            </p>

                            <img
                                src={
                                    product.image
                                }
                                alt={
                                    product.name
                                }
                                className="h-40 w-40 rounded-md border object-cover"
                            />
                        </div>
                    )}

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
                                isUpdating
                            }
                        >
                            {isUpdating
                                ? "Updating..."
                                : "Update Product"}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}