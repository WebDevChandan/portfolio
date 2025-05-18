"use client";
import { useModalAction } from "@/app/hook/useModalAction";
import '../styles/editButton.scss';
import Modal from "./Modal";

type ModalButtonType = {
    label: string,
    children: React.ReactNode
}

export default function ModalButton({ label, children }: ModalButtonType) {
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
            <Modal isModalPopUpOpen={modalPopup} setModalPopupOpen={setModalPopup} >
                {children}
            </Modal>
        </>

    )
}
