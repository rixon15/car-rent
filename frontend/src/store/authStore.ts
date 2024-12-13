import toast from "react-hot-toast"
import {create} from "zustand"
import API from "../config/apiClient.ts";

interface ISignUp {
    email: string;
    phoneNumber: string;
    password: string;
    confirmPassword: string;
}

interface ILogin {
    email: string;
    passwrod: string;
}

export const useAuthStore = create((set) => ({
    user: null,
    isSigningUp: false,
    isCheckingAuth: true,
    isLoggingOut: false,
    isLoggingIn: true,
    signup: async (credentials: ISignUp) => {
        set({isSigningUp: true});
        try {
            const response = await API.post("/auth/register", credentials);
            console.log(response);
            set({user: response});
            toast.success("Login successful");
        } catch (error) {
            toast.error(error.message || 'Signup failed');
            set({isSigningUp: false, user: null});
        }

    },
    login: async (credentials: ILogin) => {
        set({isSigningUp: true});
        try {
            await API.post("/auth/login", credentials);
            const response = await API.get('/user');
            set({user: response, isLoggingIn: false});
        } catch (error) {
            set({isLoggingin: false});
            toast.error('Login failed');
        }
    },
    logout: async () => {
        set({isLoggingOut: false});
        try {
            const response = await API.get("/auth/logout");
            set({user: null, isLoggingOut: false});
        } catch (error) {
            set({isLoggingOut: false});
            toast.error(error.message || 'Logout failed');
        }
    },
    authCheck: async () => {
        set({isCheckingAuth: false});
        try {
            const response = await API.get("/user");
            set({user: response, isCheckingAuth: false});
        } catch (error) {
            set({isCheckingAuth: false});
        }
    }


}))