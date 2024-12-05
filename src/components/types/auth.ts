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