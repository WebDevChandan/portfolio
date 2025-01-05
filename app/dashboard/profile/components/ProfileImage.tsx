"use client";
import { MyImage } from "@/app/components";
import { showToast } from "@/utils/showToast";
import { ImPencil } from "react-icons/im";
import { _UploadImageFileType } from "../../components/UploadFile";
import { useProfile } from "../../context/ProfileProvider";
import { useFileUpload } from "../../hook/useFileUpload";
import { saveAboutImage } from "../server/profileAction";
import ModalProvider from "@/app/context/ModalProvider";

export type UploadedFileForDB = {
    file: File,
    uploadedFileURL: string,

}
export default function ProfileImage() {
    const { profileData, isProfileUpdating } = useProfile();
    const { uploadImage, setIsFileUploadPopUp } = useFileUpload();

    const handleSaveAboutImage = async ({ file, uploadedFileURL }: UploadedFileForDB): Promise<object | undefined> => {
        if (isProfileUpdating) return;

        if (!_UploadImageFileType.includes(file.type)) {
            return { errorMessage: "Invalid Image!" };
        }

        try {
            const { message, errorMessage } = await saveAboutImage(uploadedFileURL);

            if (message)
                setIsFileUploadPopUp(false);

            return { message, errorMessage };

        } catch (error) {
            showToast("error", "Unexpected error occurred!");
        }
    };

    return (
        <div className="profile-img">
            {/* {blobImage && (isEditable && isUpdateable) && <MdDelete onClick={imageRemove} id="deleteImage" />} */}
            <MyImage src={profileData?.aboutImage} />

            <ImPencil
                onClick={() =>
                    uploadImage("Upload Your Image", {
                        folderName: "myImages/aboutImage",
                        height: 405,
                        width: 405,
                    }, true, handleSaveAboutImage)}
                id="uploadImage"
            />
        </div>
    )
}
