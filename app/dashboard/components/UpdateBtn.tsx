"use client";
import { useFormStatus } from "react-dom"

export default function UpdateBtn({ label }: { label: string }) {
    const { pending } = useFormStatus();
    return (
        <div className="row">
            <button className='btn-1 outer-shadow hover-in-shadow' type='submit'>{!pending ? label : "Updating..."}</button>
        </div>
    )
}
