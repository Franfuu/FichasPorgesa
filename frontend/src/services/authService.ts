import axios, { isAxiosError } from "axios";
import type { AuthResponse } from "../types/Auth";

const API_BASE_URL = import.meta.env.VITE_API_URL as string | undefined;

export const authService = {
    login(email: string, password: string) {
        return axios.post<AuthResponse>(`${API_BASE_URL}/auth/login`, { email, password }).then((r) => r.data);
    },

    register(email: string, password: string, name: string) {
        return axios.post<AuthResponse>(`${API_BASE_URL}/auth/register`, { email, password, name }).then((r) => r.data);
    },

    logout(token: string) {
        return axios.post(`${API_BASE_URL}/auth/logout`, {}, {
            headers: { Authorization: `Bearer ${token}` },
        }).then(() => {});
    },

    isAuthError: isAxiosError,
};

