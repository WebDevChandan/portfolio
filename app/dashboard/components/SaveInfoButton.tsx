"use client";
import { Dispatch, SetStateAction, useContext } from "react";
import { useFormStatus } from "react-dom"
import { EditableContext } from "../context/EditableProvider";
import { useProfile } from "../context/ProfileProvider";
import { FaFilePdf } from "react-icons/fa";

type SaveInfoButtonType = {
    isEditable: boolean,
    setIsEditable: Dispatch<SetStateAction<boolean>>,
    isUpdateAble: boolean,
}
export default function SaveInfoButton({ isEditable, setIsEditable, isUpdateAble }: SaveInfoButtonType) {
  
    const handleEdit = () => {
        setIsEditable(!isEditable);
    }

    return (
        <div className="infoUpdate-btn-container">
            <button
                className='btn-1 outer-shadow hover-in-shadow'
                type='button'
                onClick={handleEdit}
            >
                Upload Resume
            </button>

            <button
                className='btn-1 outer-shadow hover-in-shadow'
                type='button'
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
