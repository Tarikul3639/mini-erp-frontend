export interface SaleProduct {
    _id: string;

    product: {
        _id: string;
        name: string;
        sku: string;
        image: string;
        sellingPrice: number;
    };

    quantity: number;
    unitPrice: number;
    totalPrice: number;
}

export interface Sale {
    _id: string;

    customer: {
        _id: string;
        name: string;
        phone: string;
    };

    products: SaleProduct[];

    grandTotal: number;

    createdAt: string;
    updatedAt: string;
}

export interface SaleListResponse {
    success: boolean;
    message: string;

    meta: {
        page: number;
        limit: number;
        total: number;
        totalPage: number;
    };

    data: Sale[];
}

export interface SaleResponse {
    success: boolean;
    message: string;
    data: Sale;
}

export interface CreateSalePayload {
    customer: string;

    products: {
        product: string;
        quantity: number;
    }[];
}

export interface UpdateSalePayload {
    customer?: string;

    products?: {
        product: string;
        quantity: number;
    }[];
}

export interface DeleteSaleResponse {
    success: boolean;
    message: string;
}