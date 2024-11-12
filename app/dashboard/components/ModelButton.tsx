"use client";
import { ReactNode, useState } from "react";
import { FaCirclePlus, FaSquarePlus } from "react-icons/fa6";
import '../styles/modelButton.scss';
import Modal from "./Modal";
import { ManageSocialLinks } from "../profile/components";
import { BiSolidEdit } from "react-icons/bi";
import { FiEdit } from "react-icons/fi";
import { MdEdit } from "react-icons/md";
import { ImPencil } from "react-icons/im";

type ModelButtonType = {
    label: string,
    children: React.ReactNode
}

export default function ModelButton({ label, children }: ModelButtonType) {
    const [togglePopup, setTogglePopup] = useState(false);
    return (
        <>
            <div className="model-btn-container">
                <div
                    className="modelButton open btn-1 outer-shadow hover-in-shadow"
                    onClick={() => setTogglePopup(true)}>
                    {label}
                </div>
            </div>
            {<Modal isPopUpOpen={togglePopup} setTogglePopup={setTogglePopup} children={children} />}
        </>

    )
}
