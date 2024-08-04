"use client";
import { MyImage } from "@/app/components";
import { ChangeEvent, Dispatch, SetStateAction, useContext, useRef, useState } from "react";
import { ImPencil } from "react-icons/im";
import { MdDelete } from "react-icons/md";
import { Flip, toast } from "react-toastify";
import { EditableContext } from "../../context/EditableProvider";
import { InputField, UpdateBtn } from "../../components";
import Editor from "../../components/Editor";

type MainProfileType = {
    aboutImage: string,
    bio: string,
    setBio: Dispatch<SetStateAction<string>>,
}
export default function MainProfile({ aboutImage, bio, setBio }: MainProfileType) {
    const { isEditable, setIsEditable } = useContext(EditableContext);

    const [blobImage, setBlogImage] = useState<string | null>(null);

    const fileInputRef = useRef<HTMLInputElement>(null);

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
        setIsEditable(false);

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

                {blobImage && isEditable && <MdDelete onClick={imageRemove} id="deleteImage" />}

                {isEditable && <ImPencil onClick={triggerFileInput} id="uploadImage" />}

                {isEditable && <input
                    type="file"
                    name="aboutImage"
                    onChange={imageUpload}
                    accept=".webp"
                    ref={fileInputRef}
                    disabled={!isEditable}
                />}

                <MyImage src={aboutImage} blobImg={blobImage} />

            </div>

            <div className="profile-info">
                <div className={`input-group textarea-group ${isEditable ? "inner-shadow" : "outer-shadow"}`}>
                    <Editor content={bio} setContent={setBio} isEditable={isEditable} />
                </div>

                <UpdateBtn label='Update Profile' />
            </div>
        </div>
    );
}
