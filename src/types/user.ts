export interface UserResponse {
    success: boolean;
    message: string;
    data: {
        _id: string;
        name: string;
        email: string;
        role: string;
        avatar?: string;
    };
}

export interface UpdateProfilePayload {
    name: string;
}