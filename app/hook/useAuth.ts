import axios from "axios";
import { deleteCookie } from "cookies-next";
import { useContext } from "react";
import { Flip, toast } from "react-toastify";
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

            toast.success(response.data.successMessage, {
                position: "top-center",
                autoClose: 1500,
                hideProgressBar: true,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                transition: Flip,
            });

            setAuthState({
                loading: false,
                data: response.data.admin,
                error: null,
            });

        } catch (error: any) {
            const errorMessage = error.response?.data?.errorMessage || "An unexpected error occurred.";

            toast.error(errorMessage, {
                position: "top-center",
                autoClose: 1500,
                hideProgressBar: true,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                transition: Flip,
            });

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

        deleteCookie("jwt");

        toast.success("Logout Successfull", {
            position: "top-center",
            autoClose: 1500,
            hideProgressBar: true,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            transition: Flip,
        });

        setAuthState({
            loading: false,
            data: null,
            error: null,
        });
    }

    return {
        logIn,
        logOut,
    }
}