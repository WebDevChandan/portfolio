"use client";
import { Dispatch, SetStateAction, useContext } from "react";
import { useFormStatus } from "react-dom"
import { EditableContext } from "../context/EditableProvider";
import { useProfile } from "../context/ProfileProvider";

type SaveInfoButtonType = {
    isEditable: boolean,
    setIsEditable: Dispatch<SetStateAction<boolean>>,
    isUpdateAble: boolean,
}
export default function SaveInfoButton({ isEditable, setIsEditable, isUpdateAble }: SaveInfoButtonType) {
    // const { isEditable, setIsEditable, isUpdateable } = useProfile();
    // const { pending } = useFormStatus();

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
                {!isEditable ? "Edit Info" : "Save Info"}
            </button>

            {/* <button
                className={`btn-1 outer-shadow ${!isUpdateable ? "btn-disabled" : "hover-in-shadow"}`}
                onClick={(e) => {
                    const shouldSubmit = confirm(`Sure, Want to Update?`)
                    if (!shouldSubmit) {
                        e.preventDefault();
                    } else {
                        setIsEditable(false);
                    }
                }}
                type='submit'
                disabled={!isUpdateable}
            >
                {!pending ? label : "Updating..."}
            </button> */}
        </div>
    )
}
