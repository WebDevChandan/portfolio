import { CloseButton } from '@/app/components';
import '../styles/modal.scss';
import { useEffect, useMemo, useState } from 'react';

type ModelType = {
    isModelPopUpOpen: boolean,
    setModelPopup: () => void,
    children: React.ReactNode,
};
export default function Modal({ isModelPopUpOpen, setModelPopup, children }: ModelType) {
    const [isModelClosed, setIsModelClosed] = useState(false);

    useEffect(() => {
        const body = document.querySelector('body') as HTMLElement;

        if (isModelPopUpOpen) {
            body.style.overflowY = 'hidden';

            setIsModelClosed(false);
        } else {
            body.style.overflowY = 'scroll';
            const timer = setTimeout(() => {
                setIsModelClosed(true);
            }, 1000);

            return () => clearTimeout(timer);
        }
    }, [isModelPopUpOpen]);

    return (
        <div className={`modal-container${isModelPopUpOpen ? ' open' : ''}`}>
            <div className="modal">
                <div className={`modal-content outer-shadow ${isModelPopUpOpen ? 'open' : ''}`}>
                    <div className="model-header">
                        <CloseButton setModelPopup={setModelPopup} />
                    </div>
                    {!isModelClosed && children}
                </div>
            </div>
        </div>
    )
}
