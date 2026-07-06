export interface SearchProduct {
    _id: string;
    name: string;
    sku: string;
    image: string;
}

export interface SearchCustomer {
    _id: string;
    name: string;
    phone: string;
}

export interface SearchSale {
    _id: string;
    grandTotal: number;
    createdAt: string;

    customer: {
        _id: string;
        name: string;
    };
}

export interface GlobalSearchResponse {
    success: boolean;
    message: string;
    data: {
        products: SearchProduct[];
        customers: SearchCustomer[];
        sales: SearchSale[];
    };
}