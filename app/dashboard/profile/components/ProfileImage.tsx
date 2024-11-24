"use client";
import { MyImage } from "@/app/components";
import { ImPencil } from "react-icons/im";
import { useProfile } from "../../context/ProfileProvider";
import { useFileUpload } from "../../hook/useFileUpload";
import { ProfileType } from "../page";

export default function ProfileImage() {
    const { profileData } = useProfile() as { profileData: ProfileType };
    const { uploadImage } = useFileUpload();

    return (
        <div className="profile-img">
            {/* {blobImage && (isEditable && isUpdateable) && <MdDelete onClick={imageRemove} id="deleteImage" />} */}
            <MyImage src={profileData?.myImages[1]} />

            <ImPencil onClick={() => uploadImage("Upload Your Image")} id="uploadImage" />
        </div>
    )
}
