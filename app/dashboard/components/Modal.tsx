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
        if (isModelPopUpOpen) {
            setIsModelClosed(false);
        } else {
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
