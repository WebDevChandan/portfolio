"use client";
import axios from "axios";
import { getCookie } from "cookies-next";
import { createContext, useEffect, useState } from "react"

interface Admin {
    email: string,
}

interface State {
    loading: boolean,
    data: Admin | null,
    error: string | null,
}

interface AuthState extends State {
    setAuthState: React.Dispatch<React.SetStateAction<State>>
}

const defaultState: State = {
    loading: false,
    error: null,
    data: null,
}

export const AuthenticationContext = createContext<AuthState>({
    ...defaultState,
    setAuthState: () => { }
})

export default function AuthContext({ children }: { children: React.ReactNode }) {
    const [authState, setAuthState] = useState<State>({
        loading: true,
        data: null,
        error: null,
    })

    const fetchAdmin = async () => {
        try {
            setAuthState({
                loading: true,
                data: null,
                error: null,
            });

            const jwt = getCookie("jwt");

            if (!jwt)
                return setAuthState({
                    loading: false,
                    data: null,
                    error: null,
                });

            const response = await axios.get(`${process.env.NEXT_PUBLIC_URL}/api/auth/me`, {
                headers: {
                    authorization: jwt
                }
            });

            axios.defaults.headers.common["authorization"] = `${jwt}`;

            setAuthState({
                loading: false,
                data: response.data.data,
                error: null,
            })

        } catch (error: any) {
            setAuthState({
                loading: false,
                data: null,
                error: error.response.data.error,
            });
        }
    }

    useEffect(() => {
        fetchAdmin();
    }, []);

    return (
        <AuthenticationContext.Provider value={{
            ...authState,
            setAuthState,
        }}>
            {children}
        </AuthenticationContext.Provider>
    )
}
