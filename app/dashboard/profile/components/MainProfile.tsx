"use client";
import { MyImage } from "@/app/components";
import { ChangeEvent, useContext, useRef, useState } from "react";
import { ImPencil } from "react-icons/im";
import { MdDelete } from "react-icons/md";
import { Flip, toast } from "react-toastify";
import ProfileInfo from "./ProfileInfo";
import { EditableContext } from "../../context/EditableProvider";

export default function MainProfile() {
    const {setIsEditable} = useContext(EditableContext);
    const [blobImage, setBlogImage] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const bio = "Hello, My name is Chandan Kumar. I am a Full-Stack Web/Java Developer from Jharkhand, India. I like to code things from scratch and enjoy bringing ideas to life in the browser. I value simple content structure, clean design patterns, and thoughtful interactions. I've done remote work for agencies, consulted for startups, and also worked as a Freelancer in a various online digital platform. I love in turning People's Imagination into Reality. Feel free to take a look at my latest projects on Portfolio Page";

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

                {blobImage && <MdDelete onClick={imageRemove} id="deleteImage" />}

                <ImPencil onClick={triggerFileInput} id="uploadImage" />

                <input
                    type="file"
                    name="aboutImage"
                    onChange={imageUpload}
                    accept=".webp"
                    ref={fileInputRef}
                />

                <MyImage src="Chandan_Kumar.webp" blobImg={blobImage} />

            </div>

            <ProfileInfo bio={bio} />
        </div>
    );
}
