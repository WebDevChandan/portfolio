'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useActionState, useEffect, useState } from 'react';
import { FaLock, FaUser } from 'react-icons/fa';
import { login } from '@/app/server/login.action';
import { showToast } from '@/utils/showToast';

type AuthState = {
    message?: string;
    errorMessage?: string;
};

const initialState: AuthState = {};

export default function AuthForm() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [state, formAction, isPending] = useActionState(login, initialState);

    const [inputs, setInputs] = useState({
        email: '',
        password: '',
    });

    const isDisabled = inputs.email.length < 15 || inputs.password.length < 8;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputs((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    useEffect(() => {
        if (state.message) {
            showToast('success', state.message);
            const returnURL = searchParams.get("returnUrl") as string;

            if (!returnURL)
                router.push('/dashboard');
            else
                router.push(`${decodeURIComponent(returnURL)}`);

        } else if (state.errorMessage) {
            showToast('error', state.errorMessage);
        }
    }, [state, router]);

    return (
        <form autoComplete="off" action={formAction}>
            <div className="field outer-shadow hover-in-shadow">
                <span className="fa fa-user">
                    <FaUser />
                </span>
                <input
                    type="email"
                    placeholder="Email ID"
                    name="email"
                    required
                    value={inputs.email}
                    onChange={handleChange}
                    autoComplete="off"
                />
            </div>

            <div className="field outer-shadow hover-in-shadow">
                <span className="fa fa-lock">
                    <FaLock />
                </span>
                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    required
                    value={inputs.password}
                    onChange={handleChange}
                    autoComplete="off"
                />
            </div>

            <button
                type="submit"
                className={`btn-1 login-btn outer-shadow ${isDisabled ? 'btn-disabled' : 'hover-in-shadow'}`}
                disabled={isDisabled || isPending}
            >
                {isPending ? 'Loading...' : 'Login'}
            </button>

            <div className="forgot-pass-container">
                <p className="forgot-pass">Forgotten password?</p>
            </div>
        </form>
    );
}
