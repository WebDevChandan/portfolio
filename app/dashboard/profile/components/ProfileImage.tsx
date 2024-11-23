"use client";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { MdDelete } from "react-icons/md";
import { ProfileHeaderType } from "./ProfileHeader";
import { Flip, toast } from "react-toastify";
import { MyImage } from "@/app/components";
import { ImPencil } from "react-icons/im";
import { useProfile } from "../../context/ProfileProvider";
import Modal from "../../components/Modal";

export default function ProfileImage({ isEditable, setIsEditable, isUpdateable, setIsUpdateable, }: ProfileHeaderType) {
    const { profileData } = useProfile();
    const [blobImage, setBlogImage] = useState<string | null>(null);
    const [isUploadImagePopup, setIsUploadImagePopup] = useState<boolean>(false);

    const fileInputRef = useRef<HTMLInputElement>(null);

    // useEffect(() => {
    //     const hasImageChanged = blobImage !== null;

    //     setIsUpdateable(hasImageChanged);
    // }, [blobImage, setIsUpdateable]);

    // const imageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    //     const files = e.target.files;

    //     if (files && files.length > 0) {
    //         const file = files[0];

    //         if (file.type === "image/webp") {
    //             const blobImageUrl = URL.createObjectURL(file);
    //             setBlogImage(blobImageUrl);
    //             setIsEditable(true);

    //         } else {
    //             toast.error("Unsupported Image Type", {
    //                 position: "top-center",
    //                 autoClose: 1500,
    //                 hideProgressBar: true,
    //                 closeOnClick: false,
    //                 pauseOnHover: false,
    //                 draggable: false,
    //                 progress: undefined,
    //                 transition: Flip,
    //             });

    //             if (fileInputRef.current)
    //                 fileInputRef.current.value = "";
    //         }
    //     }
    // }

    // const imageRemove = () => {
    //     setBlogImage(null);

    //     if (fileInputRef.current)
    //         fileInputRef.current.value = "";
    // }

    // const triggerFileInput = () => {
    //     if (fileInputRef.current) {
    //         fileInputRef.current.click();
    //     }
    // }


    const handleImagePopup = () => {
        setIsUploadImagePopup(!isUploadImagePopup);
    }


    return (
        <div className="profile-img">

            {/* {blobImage && (isEditable && isUpdateable) && <MdDelete onClick={imageRemove} id="deleteImage" />} */}

            <ImPencil onClick={handleImagePopup} id="uploadImage" />

            {/* <input
                type="file"
                name="aboutImage"
                onChange={imageUpload}
                accept=".webp"
                ref={fileInputRef}
                disabled={!isEditable && !isUpdateable}
            /> */}

            <MyImage src={profileData?.myImages[1]} blobImg={blobImage} />

            <Modal isModelPopUpOpen={isUploadImagePopup} setModelPopup={handleImagePopup} children={<></>} />

        </div>
    )
}
