"use client";
import SubmitButton from "@/app/components/SubmitButton";
import useAuth from "@/app/hook/useAuth";
import { ChangeEvent, useEffect, useState } from "react";
import { FaLock, FaUser } from "react-icons/fa";

export default function AuthForm() {
    const [inputs, setInputs] = useState({
        email: "",
        password: "",
    });
    const [disabled, setDisabled] = useState(true);
    const { logIn } = useAuth();

    useEffect(() => {
        if (inputs.email.length > 15 && inputs.password.length > 6)
            return setDisabled(false);
        else
            setDisabled(true);

    }, [inputs])

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (disabled) return null;

        setDisabled(true);

        await logIn({ email: inputs.email, password: inputs.password });

        setDisabled(false);
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

            <SubmitButton handleSubmit={handleSubmit} disabled={disabled}/>

            <div className="forgot-pass-container">
                <p className="forgot-pass">Forgotten password?</p>
            </div>

        </form>
    )
}
