"use client";
import { useContext } from "react";
import { useFormStatus } from "react-dom"
import { EditableContext } from "../context/EditableProvider";

export default function UpdateBtn({ label }: { label: string }) {
    const { isEditable, setIsEditable } = useContext(EditableContext);
    const { pending } = useFormStatus();

    const handleEdit = () => {
        setIsEditable(!isEditable);
    }

    return (
        <div className="update-btn-container" style={{ float: "right" }}>
            <button
                className='btn-1 outer-shadow hover-in-shadow'
                type='button'
                style={{ margin: "0px 20px" }}
                onClick={handleEdit}
            >
                {!isEditable ? "Edit" : "Save"}
            </button>

            <button
                className={`btn-1 outer-shadow ${!isEditable ? "btn-disabled" : "hover-in-shadow"}`}
                type='submit'
                disabled={!isEditable}
            >
                {!pending ? label : "Updating..."}
            </button>
        </div>
    )
}
