"use client";
import { MyImage } from "@/app/components";
import { ChangeEvent, useContext, useEffect, useRef, useState } from "react";
import { ImPencil } from "react-icons/im";
import { MdDelete } from "react-icons/md";
import { Flip, toast } from "react-toastify";
import { Editor, UpdateButton } from "../../components";
import { EditableContext } from "../../context/EditableProvider";
import { useProfile } from "../../context/ProfileProvider";

export default function MainProfile() {
    const { profileData, isEditable, setIsEditable, setIsUpdateable, isUpdateable } = useProfile();

    const [blobImage, setBlogImage] = useState<string | null>(null);

    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const hasImageChanged = blobImage !== null;

        setIsUpdateable(hasImageChanged);
    }, [blobImage, setIsUpdateable]);

    const imageUpload = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;

        if (files && files.length > 0) {
            const file = files[0];

            if (file.type === "image/webp") {
                const blobImageUrl = URL.createObjectURL(file);
                setBlogImage(blobImageUrl);
                setIsEditable(true);

            } else {
                toast.error("Unsupported Image Type", {
                    position: "top-center",
                    autoClose: 1500,
                    hideProgressBar: true,
                    closeOnClick: false,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                    transition: Flip,
                });

                if (fileInputRef.current)
                    fileInputRef.current.value = "";
            }
        }
    }

    const imageRemove = () => {
        setBlogImage(null);

        if (fileInputRef.current)
            fileInputRef.current.value = "";
    }

    const triggerFileInput = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    }

    return (
        <div className="row">
            <div className="profile-img">

                {blobImage && (isEditable && isUpdateable) && <MdDelete onClick={imageRemove} id="deleteImage" />}

                {isEditable && <ImPencil onClick={triggerFileInput} id="uploadImage" />}

                <input
                    type="file"
                    name="aboutImage"
                    onChange={imageUpload}
                    accept=".webp"
                    ref={fileInputRef}
                    disabled={!isEditable && !isUpdateable}
                />

                <MyImage src={profileData?.myImages[1]} blobImg={blobImage} />

            </div>

            <div className="profile-info">
                <Editor content={profileData ? profileData?.about : " "} isEditable={isEditable} isUpdateable={isUpdateable} setIsUpdateable={setIsUpdateable} />

                <UpdateButton label='Update Profile' />
            </div>
        </div>
    );
}
