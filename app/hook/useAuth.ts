import axios from "axios";
import { useContext } from "react";
import { AuthenticationContext } from "../context/AuthContext";

interface LogInParams {
    email: string;
    password: string;
}

export default function useAuth() {
    const { setAuthState } = useContext(AuthenticationContext);

    const logIn = async ({ email, password }: LogInParams) => {
        setAuthState({
            loading: true,
            data: null,
            error: null,
        });

        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_URL}/api/auth/login`, {
                email,
                password
            });

            setAuthState({
                loading: false,
                data: response.data.admin,
                error: null,
            });

            return response;

        } catch (error: any) {
            const errorMessage = error.response?.data?.errorMessage || "An unexpected error occurred.";
            setAuthState({
                loading: false,
                data: null,
                error: errorMessage,
            });
        }
    }

    const logOut = async () => {
        setAuthState({
            loading: true,
            data: null,
            error: null,
        });

    }

    return {
        logIn,
        logOut,
    }
}