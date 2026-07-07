export interface Customer {
    _id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    createdAt: string;
    updatedAt: string;
}

export interface CustomerResponse {
    success: boolean;
    message: string;
    data: Customer;
}

export interface CustomerListResponse {
    success: boolean;
    message: string;
    meta: {
        page: number;
        limit: number;
        total: number;
        totalPage: number;
    };

    data: Customer[];
}