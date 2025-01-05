"use client";
import { useState } from "react";
import '../styles/editButton.scss';
import Modal from "./Modal";
import { useModalAction } from "@/app/hook/useModalAction";

type ModalButtonType = {
    label: string,
    children: React.ReactNode
}

export default function EditButton({ label, children }: ModalButtonType) {
    const { modalPopup, setModalPopup } = useModalAction();

    return (
        <>
            <div className="edit-btn-container">
                <div
                    className="editButton btn-1 outer-shadow hover-in-shadow"
                    onClick={() => setModalPopup(!modalPopup)}>
                    {label}
                </div>
            </div>
            <Modal isModalPopUpOpen={modalPopup} setModalPopup={setModalPopup} children={children} />
        </>

    )
}
