'use client';
import { useFormStatus } from "react-dom";

export default function SubmitButton({ handleSubmit, disabled }: { handleSubmit: (e: React.FormEvent) => void, disabled: boolean }) {
    const { pending } = useFormStatus();

    return (
        <button type="submit"
            className={`btn-1 login-btn outer-shadow ${disabled ? "btn-disabled" : "hover-in-shadow"}`}
            onClick={(e) => handleSubmit(e)}
            disabled={disabled}
        >
            {pending ? "loading..." : "Login"}
        </button>
    )
}
