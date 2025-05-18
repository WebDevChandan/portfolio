"use client";
import { CloseButton } from '@/app/components';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import '../styles/modal.scss';
import { useModalAction } from '@/app/hook/useModalAction';

type ModalType = {
    isModalPopUpOpen: boolean,
    setModalPopupOpen: Dispatch<SetStateAction<boolean>>
    children: React.ReactNode,
};
export default function Modal({ isModalPopUpOpen, setModalPopupOpen, children }: ModalType) {
    const { modalPopup, isModalLoading } = useModalAction();
    const [isModalClosed, setIsModalClosed] = useState(false);

    useEffect(() => {
        if (isModalLoading) return;

        if (!modalPopup)
            setModalPopupOpen(false);

    }, [modalPopup])

    useEffect(() => {
        if (isModalLoading) return;

        const body = document.querySelector('body') as HTMLElement;

        if (isModalPopUpOpen || modalPopup) {
            body.style.overflowY = 'hidden';

            setIsModalClosed(false);

        } else {
            body.style.overflowY = 'scroll';
            const timer = setTimeout(() => {
                setIsModalClosed(true);
            }, 1000);

            return () => clearTimeout(timer);
        }

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setModalPopupOpen(false);
            }
        };

        //Close Modal on click Outside - Removed for now
        const handleClick = (event: MouseEvent) => {
            if (isModalPopUpOpen) {
                const modalElement = document.querySelector('.modal-container .open') as HTMLElement | null;
                const isInsideModalClick = modalElement?.contains(event.target as Node);

                if (!isInsideModalClick) {
                    setModalPopupOpen(false);
                }
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('click', handleClick);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('click', handleClick);
        };
    }, [isModalPopUpOpen, setModalPopupOpen, modalPopup]);

    return (
        <div className={`modal-container${isModalPopUpOpen ? ' open' : ''}`}>
            <div className="modal">
                <div className={`modal-content outer-shadow ${isModalPopUpOpen ? 'open' : ''}`}>
                    <div className="modal-header">
                        <CloseButton setModalPopupOpen={setModalPopupOpen} />
                    </div>
                    {!isModalClosed && children}
                </div>
            </div>
        </div>
    )
}
