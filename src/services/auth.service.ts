import axios from '../config/axios';

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface AuthResponse {
    token: string;
    User: {
        name: string;
        email: string;
        role: string;
    };
}

export interface ResetPasswordData {
    token: string;
    newPassword: string;
}

class AuthService {
    private static instance: AuthService;
    private readonly BASE_PATH = '/auth';

    private constructor() {}

    public static getInstance(): AuthService {
        if (!AuthService.instance) {
            AuthService.instance = new AuthService();
        }
        return AuthService.instance;
    }

    async login(credentials: LoginCredentials): Promise<AuthResponse> {
        try {
            const { data } = await axios.post(`${this.BASE_PATH}/login`, credentials);
            if (data.token) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.User));
            }
            return data;
        } catch (error: any) {
            if (error.response?.status === 401) {
                throw new Error('Invalid email or password');
            }
            throw error;
        }
    }

    async forgotPassword(email: string): Promise<{ message: string }> {
        try {
            const { data } = await axios.post(`${this.BASE_PATH}/forgot-password`, { email });
            return data;
        } catch (error: any) {
            // Always return success message for security
            return {
                message: 'If an account exists, password reset instructions will be sent.'
            };
        }
    }

    async resetPassword(resetData: ResetPasswordData): Promise<{ message: string }> {
        const { data } = await axios.post(`${this.BASE_PATH}/reset-password`, resetData);
        return data;
    }

    logout(): void {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('user');
        window.location.href = '/login';
    }

    isAuthenticated(): boolean {
        return !!(localStorage.getItem('token') || sessionStorage.getItem('token'));
    }
}

export const authService = AuthService.getInstance();