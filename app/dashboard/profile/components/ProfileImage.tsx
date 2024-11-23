"use client";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { MdDelete } from "react-icons/md";
import { ProfileHeaderType } from "./ProfileHeader";
import { Flip, toast } from "react-toastify";
import { MyImage } from "@/app/components";
import { ImPencil } from "react-icons/im";
import { useProfile } from "../../context/ProfileProvider";
import Modal from "../../components/Modal";
import UploadFile, { FileType } from "../../components/UploadFile";
import { ProfileType } from "../page";
import UploadImage from "../../components/UploadImage";

export default function ProfileImage({ isEditable, setIsEditable, isUpdateable, setIsUpdateable, }: ProfileHeaderType) {
    const { profileData } = useProfile() as { profileData: ProfileType };

    return (
        <div className="profile-img">
            <MyImage src={profileData?.myImages[1]} />

            <UploadImage uploadTitle="Upload Your Image" />
        </div>
    )
}
