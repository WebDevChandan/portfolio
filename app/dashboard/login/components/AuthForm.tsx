"use client";
import { AuthenticationContext } from "@/app/context/AuthContext";
import useAuth from "@/app/hook/useAuth";
import { useRouter } from "next/navigation";
import { ChangeEvent, MouseEventHandler, useContext, useEffect, useState } from "react";
import { FaLock, FaUser } from "react-icons/fa";

export default function AuthForm() {
    const { loading, data, error } = useContext(AuthenticationContext);
    const [disabled, setDisabled] = useState(true);
    const { logIn } = useAuth();
    const rounter = useRouter();
    const [inputs, setInputs] = useState({
        email: "",
        password: "",
    })



    useEffect(() => {
        if (inputs.email.length > 10 && inputs.password.length > 6)
            return setDisabled(false);

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
        
        const { status } = await logIn({ email: inputs.email, password: inputs.password }) as { status: number };

        console.log(status);
    }

    return (
        <form>
            <div className="field outer-shadow hover-in-shadow">
                <span className="fa fa-user"><FaUser /></span>
                <input type="email" placeholder="Email ID" name="email" required onChange={(e) => handleChange(e)} />
            </div>

            <div className="field outer-shadow hover-in-shadow">
                <span className="fa fa-lock"><FaLock /></span>
                <input type="password" placeholder="Password" name="password" required onChange={(e) => handleChange(e)} />
            </div>

            <button type="submit" className="btn-1 outer-shadow hover-in-shadow"
                onClick={(e) => handleSubmit(e)}
            // disabled={disabled}
            >
                Login
            </button>

            <div className="forgot-pass-container">
                <p className="forgot-pass">Forgotten password?</p>
            </div>

        </form>
    )
}
