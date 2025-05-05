"use client";
import { Dispatch, SetStateAction } from "react";

type SaveInfoButtonType = {
    isEditable: boolean,
    setIsEditable: Dispatch<SetStateAction<boolean>>,
    isUpdateAble: boolean,
}
export default function SaveInfoButton({ isEditable, setIsEditable }: SaveInfoButtonType) {
  
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
        </div>
    )
}
