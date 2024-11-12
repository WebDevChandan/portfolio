import { Dispatch, SetStateAction } from 'react';
import '../styles/modal.scss';
import { CloseButton } from '@/app/components';

type ModelType = {
    isPopUpOpen: boolean
    setTogglePopup: Dispatch<SetStateAction<boolean>>,
    children: React.ReactNode,
};

export default function Modal({ isPopUpOpen, setTogglePopup, children }: ModelType) {
    return (
        <div className={`modal-container ${isPopUpOpen ? 'open' : ''}`}>
            <div className="modal">
                <div className={`modal-content outer-shadow ${isPopUpOpen ? 'open' : ''}`}>
                    <div className="model-header">
                        <CloseButton setTogglePopup={setTogglePopup} />
                    </div>
                    {isPopUpOpen && children}
                </div>
            </div>
        </div>
    )
}
