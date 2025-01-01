export interface RegisterRequest {
    username: string;
    email: string;
    password: string;
}

export interface RegisterResponse {
    id: number;
    username: string;
    email: string;
    token: string;
}

export type UserRole = {
    name: string,
    isActive?: boolean
}

export type UserType = {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
    middle_name: string;
    phone: string;
    address: string;
    role: string;
    is_active: boolean;
    created_at: string;
    image_url?: string;
    mfa_enabled?: boolean;
};