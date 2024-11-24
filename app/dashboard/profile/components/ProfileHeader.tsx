"use client";
import { useState } from "react";
import { Editor } from "../../components";
import { useFileUpload } from "../../hook/useFileUpload";
import ProfileImage from "./ProfileImage";


export default function Profileheader() {
    const { uploadPDF } = useFileUpload();
    const [isEditable, setIsEditable] = useState<boolean>(false);
    const [isUpdated, setIsUpdated] = useState<boolean>(false);

    return (
        <div className="row">
            <ProfileImage />

            <div className="profile-info">
                <Editor isEditable={isEditable} isUpdated={isUpdated} setIsUpdated={setIsUpdated} />

                <div className="infoUpdate-btn-container">
                    <button
                        className='btn-1 outer-shadow hover-in-shadow'
                        type='button'
                        onClick={() => uploadPDF("Uploard Your Resume")}>
                        Upload Resume
                    </button>

                    <button
                        className={`btn-1 outer-shadow hover-in-shadow`}
                        type='button'
                        onClick={() => setIsEditable(!isEditable)}>
                        {!isEditable ? "Edit Info" : !isUpdated ? "Cancel Edit" : "Save Info"}
                    </button>
                </div>
            </div>
        </div>
    );
}
