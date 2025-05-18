"use client";
import ServerSpinLoader from "@/app/components/Loader/ServerSpinLoader";
import { showToast } from "@/utils/showToast";
import { Editor } from "../../components";
import { useProfile } from "../../context/ProfileProvider";
import { useEditorAction } from "../../hook/useEditorAction";
import { useFileUpload } from "../../hook/useFileUpload";
import { saveAboutInfo, saveResume } from "../server/profile.action";
import ProfileImage, { UploadedFileForDB } from "./ProfileImage";


export default function Profileheader() {
    const { isProfileUpdating, setIsProfileUpdating } = useProfile();
    const { isEditable, isUpdated, setIsUpdated, editorContent, handleEditorContent } = useEditorAction();
    const { uploadPDF, setIsFileUploadPopUp } = useFileUpload();

    const handleSaveInfo = async () => {
        if (isProfileUpdating) return;

        setIsProfileUpdating(true);

        try {
            const { message, errorMessage } = await saveAboutInfo(editorContent);

            if (message) showToast("success", message);
            if (errorMessage) showToast("error", errorMessage);

        } catch (error) {
            showToast("error", "Unexpected error occurred!");
            console.error("Unexpected error occurred: " + error);

        } finally {
            setIsProfileUpdating(false);
            setIsUpdated(false);
        }
    };

    const handleResume = async ({ file, uploadedFileURL }: UploadedFileForDB): Promise<object | undefined> => {
        if (isProfileUpdating) return;

        if (file.type !== "application/pdf")
            return { errorMessage: "Invalid File!" };

        try {
            const { message, errorMessage } = await saveResume(uploadedFileURL);

            if (message)
                setIsFileUploadPopUp(false);

            return { message, errorMessage };

        } catch (error) {
            console.error("Error saving resume: ", error);
            showToast("error", "Unexpected error occurred!");
        }
    };


    return (
        <div className="row">
            <ProfileImage />

            <div className="profile-info">
                <Editor />

                <div className="infoUpdate-btn-container">
                    <button
                        className='btn-1 outer-shadow hover-in-shadow'
                        type='button'
                        onClick={() => uploadPDF("Upload Your Resume", {
                            folderName: "Resume",
                        }, handleResume)}
                    >
                        Upload Resume
                    </button>

                    <button
                        className={`btn-1 outer-shadow hover-in-shadow ${isProfileUpdating ? "btn-disabled" : ""}`}
                        type='button'
                        onClick={(event) => handleEditorContent(event, handleSaveInfo, isProfileUpdating)}
                    >
                        {isProfileUpdating ? (
                            <>
                                <ServerSpinLoader />
                                Saving Info...
                            </>
                        ) : (
                            !isEditable
                                ? "Edit Info"
                                : !isUpdated
                                    ? "Cancel Edit"
                                    : "Save Info"
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
