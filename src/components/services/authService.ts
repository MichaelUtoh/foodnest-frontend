import api from "./api";
import { RegisterRequest, RegisterResponse } from "../types/auth";

export const registerUser = async (
    data: RegisterRequest
): Promise<RegisterResponse> => {
    try {
        const response = await api.post<RegisterResponse>("/register", data);
        return response.data;
    } catch (error: any) {
        if (error.response) {
            throw new Error(error.response.data?.message || "Registration failed");
        } else {
            throw new Error("An unexpected error occurred");
        }
    }
};

