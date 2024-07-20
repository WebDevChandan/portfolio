"use client";
import { AuthenticationContext } from "@/app/context/AuthContext";
import useAuth from "@/app/hook/useAuth";
import { useRouter } from "next/navigation";
import { ChangeEvent, MouseEventHandler, useContext, useEffect, useState } from "react";
import { FaLock, FaUser } from "react-icons/fa";
import { toast } from "react-toastify";

export default function AuthForm() {
    const { loading, data, error } = useContext(AuthenticationContext);
    const [inputs, setInputs] = useState({
        email: "",
        password: "",
    });
    const [disabled, setDisabled] = useState(true);
    const { logIn } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (data) router.push('/dashboard');

        if (inputs.email.length > 15 && inputs.password.length > 6)
            return setDisabled(false);
        else
            setDisabled(true);

    }, [inputs, data])

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        await logIn({ email: inputs.email, password: inputs.password });

    }

    return (
        <form autoComplete="off" method="POST">
            <div className="field outer-shadow hover-in-shadow">
                <span className="fa fa-user"><FaUser /></span>
                <input type="email" placeholder="Email ID" name="email" required onChange={(e) => handleChange(e)} autoComplete="off" />
            </div>

            <div className="field outer-shadow hover-in-shadow">
                <span className="fa fa-lock"><FaLock /></span>
                <input type="password" placeholder="Password" name="password" required onChange={(e) => handleChange(e)} autoComplete="off" />
            </div>

            <button type="submit"
                className={`btn-1 login-btn outer-shadow ${disabled ? "disabled" : "hover-in-shadow"}`}
                onClick={(e) => handleSubmit(e)}
                disabled={disabled}
            >
                {loading ? "loading..." : "Login"}
            </button>

            <div className="forgot-pass-container">
                <p className="forgot-pass">Forgotten password?</p>
            </div>

        </form>
    )
}
