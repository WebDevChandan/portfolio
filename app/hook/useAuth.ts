import axios from "axios";
import { setCookie } from "cookies-next";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { Flip, toast } from "react-toastify";

interface LogInParams {
    email: string;
    password: string;
}

export default function useAuth() {
    const clientCSRFToken = crypto.randomUUID();
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        if (clientCSRFToken)
            setCookie('csrf', clientCSRFToken, {
                httpOnly: false,
                secure: true,
                path: '/',
                sameSite: 'strict',
            });
    }, [clientCSRFToken])

    const logIn = async ({ email, password }: LogInParams) => {
        if (!email || !password || !clientCSRFToken) return null;

       

        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_URL}/api/auth/login`, {
                email,
                password,
                clientCSRFToken,
            });

            if (response.status === 200) {
                const returnURL = searchParams.get("returnUrl") as string;

                if (!returnURL)
                    router.push('/dashboard');
                else
                    router.push(`${decodeURIComponent(returnURL)}`);
            }

            toast.success(response.data.message, {
                position: "top-center",
                autoClose: 1500,
                hideProgressBar: true,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                transition: Flip,
            });

           

        } catch (error: any) {
            const errorMessage = error.response?.data?.errorMessage || "An unexpected error occurred";

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

            
        }
    }

    const logOut = async () => {
       

        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_URL}/api/auth/logout`);

            if (response.status === 200) {
                router.push("/login");
            }

            toast.success(response.data.message, {
                position: "top-center",
                autoClose: 1500,
                hideProgressBar: true,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                transition: Flip,
            });


        } catch (error: any) {
            const errorMessage = error.response?.data?.errorMessage || "An unexpected error occurred";

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

        }
    }

    return {
        logIn,
        logOut,
    }
}