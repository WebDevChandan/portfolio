"use client";
import { useState } from "react";
import '../styles/editButton.scss';
import Modal from "./Modal";

type ModalButtonType = {
    label: string,
    children: React.ReactNode
}

export default function EditButton({ label, children }: ModalButtonType) {
    const [modalPopup, setModalPopup] = useState(false);

    return (
        <>
            <div className="edit-btn-container">
                <div
                    className="editButton btn-1 outer-shadow hover-in-shadow"
                    onClick={() => setModalPopup(!modalPopup)}>
                    {label}
                </div>
            </div>
            {<Modal isModalPopUpOpen={modalPopup} setModalPopup={setModalPopup} children={children} />}
        </>

    )
}
