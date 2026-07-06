export interface Product {
    _id: string;
    name: string;
    sku: string;
    category: string;
    purchasePrice: number;
    sellingPrice: number;
    stockQuantity: number;
    image: string;
    createdAt: string;
    updatedAt: string;
}

export interface ProductListResponse {
    success: boolean;
    message: string;
    meta: {
        page: number;
        limit: number;
        total: number;
        totalPage: number;
    };
    data: Product[];
}

export interface ProductFormData {
    name: string;
    sku: string;
    category: string;
    purchasePrice: number;
    sellingPrice: number;
    stockQuantity: number;
    image?: File;
}

export const ProductCategory = {
    ELECTRONICS: "Electronics",
    GROCERY: "Grocery",
    FASHION: "Fashion",
    STATIONERY: "Stationery",
    OTHER: "Other",
} as const;

export type ProductCategory = (typeof ProductCategory)[keyof typeof ProductCategory];