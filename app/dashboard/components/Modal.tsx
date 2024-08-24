"use client";
import { Dispatch, SetStateAction } from 'react';
import '../styles/modal.scss';

type ModelType = {
    isPopUpOpen: boolean
    setTogglePopup: Dispatch<SetStateAction<boolean>>,
    children: React.ReactNode,
};

export default function Modal({ isPopUpOpen, setTogglePopup, children }: ModelType) {
    return (
        <div className={`modal outer-shadow ${isPopUpOpen ? 'open' : ''}`}>
            <div className="cross" onClick={() => setTogglePopup(false)} style={{width:"100px", height:"100px"}}>Click X</div>
            {children}
        </div>
    )
}
