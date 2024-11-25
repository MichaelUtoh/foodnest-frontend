// services/authService.ts
import api from "./api";
import { RegisterRequest, RegisterResponse } from "../types/auth";

export const registerUser = async (
    data: RegisterRequest
): Promise<RegisterResponse> => {
    try {
        const response = await api.post<RegisterResponse>("/register", data);
        return response.data;
    } catch (error: any) {
        // Handle and rethrow errors
        if (error.response) {
            throw new Error(error.response.data?.message || "Registration failed");
        } else {
            throw new Error("An unexpected error occurred");
        }
    }
};

