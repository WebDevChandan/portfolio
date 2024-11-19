"use client";
import { MyImage } from "@/app/components";
import { ChangeEvent, Dispatch, SetStateAction, useContext, useEffect, useRef, useState } from "react";
import { ImPencil } from "react-icons/im";
import { MdDelete } from "react-icons/md";
import { Flip, toast } from "react-toastify";
import { Editor, SaveInfoButton } from "../../components";
import { EditableContext } from "../../context/EditableProvider";
import { useProfile } from "../../context/ProfileProvider";
import ProfileImage from "./ProfileImage";

export type ProfileHeaderType = {
    // content: string,
    isEditable: boolean,
    isUpdateable: boolean,
    setIsUpdateable: Dispatch<SetStateAction<boolean>>,
    setIsEditable: Dispatch<SetStateAction<boolean>>
}

export default function Profileheader() {
    // const { profileData, isEditable, setIsEditable, setIsUpdateable, isUpdateable } = useProfile();
    const [isEditable, setIsEditable] = useState<boolean>(false);
    const [isUpdateable, setIsUpdateable] = useState<boolean>(false);



    return (
        <div className="row">
            <ProfileImage isEditable={isEditable} setIsEditable={setIsEditable} isUpdateable={isUpdateable} setIsUpdateable={setIsUpdateable} />

            <div className="profile-info">
                <Editor isEditable={isEditable} setIsEditable={setIsEditable} isUpdateable={isUpdateable} setIsUpdateable={setIsUpdateable} />

                <SaveInfoButton isEditable={isEditable} setIsEditable={setIsEditable} isUpdateAble={isUpdateable} />
            </div>
        </div>
    );
}
