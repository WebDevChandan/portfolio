"use client";
import { FaPlus } from "react-icons/fa";
import '../styles/addButton.scss';
import Modal from "./Modal";
import { useState } from "react";
import { SocialLinks } from "../profile/components";


export default function AddButton() {
    const [togglePopup, setTogglePopup] = useState(false);
    return (
        <>
            <label className="addButton open" onClick={() => setTogglePopup(true)}><FaPlus /></label>
            <Modal isPopUpOpen={togglePopup} setTogglePopup={setTogglePopup} children={<></>} />
        </>

    )
}
