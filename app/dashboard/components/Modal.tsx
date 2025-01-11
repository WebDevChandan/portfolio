"use client";
import { CloseButton } from '@/app/components';
import '../styles/modal.scss';
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';

type ModalType = {
    isModalPopUpOpen: boolean,
    setModalPopup: Dispatch<SetStateAction<boolean>>
    children: React.ReactNode,
};
export default function Modal({ isModalPopUpOpen, setModalPopup, children }: ModalType) {
    const [isModalClosed, setIsModalClosed] = useState(false);

    useEffect(() => {
        const body = document.querySelector('body') as HTMLElement;

        if (isModalPopUpOpen) {
            body.style.overflowY = 'hidden';

            setIsModalClosed(false);

        } else {
            body.style.overflowY = 'scroll';

            const timer = setTimeout(() => {
                setIsModalClosed(true);
            }, 1000);

            return () => clearTimeout(timer);
        }
    }, [isModalPopUpOpen]);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setModalPopup(false);
            }
        };

        //Close Modal on click Outside - Removed for now
        const handleClick = (event: MouseEvent) => {
            if (isModalPopUpOpen) {
                const modalElement = document.querySelector('.modal-container .open') as HTMLElement | null;
                const isInsideModalClick = modalElement?.contains(event.target as Node);

                if (!isInsideModalClick ) {
                    setModalPopup(false);
                }
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        // document.addEventListener('click', handleClick);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            // document.removeEventListener('click', handleClick);
        };
    }, [isModalPopUpOpen, setModalPopup]);

    return (
        <div className={`modal-container${isModalPopUpOpen ? ' open' : ''}`}>
            <div className="modal">
                <div className={`modal-content outer-shadow ${isModalPopUpOpen ? 'open' : ''}`}>
                    <div className="modal-header">
                        <CloseButton setModalPopup={setModalPopup} />
                    </div>
                    {!isModalClosed && children}
                </div>
            </div>
        </div>
    )
}
