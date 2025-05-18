"use client";
import { createContext, Dispatch, SetStateAction, useState } from "react";

interface ModalProviderContext {
    modalPopup: boolean;
    setModalPopup: Dispatch<SetStateAction<boolean>>;
    isModalLoading: boolean;
    setIsModalLoading: Dispatch<SetStateAction<boolean>>;
}

export const ModalProviderContext = createContext<ModalProviderContext>({
    modalPopup: false,
    setModalPopup: () => { },
    isModalLoading: false,
    setIsModalLoading: () => { },
});

export default function ModalProvider({ children }: { children: React.ReactNode }) {
    const [modalPopup, setModalPopup] = useState(false);
    const [isModalLoading, setIsModalLoading] = useState(false);


    return (
        <ModalProviderContext.Provider value={{ modalPopup, setModalPopup, isModalLoading, setIsModalLoading }}>
            {children}
        </ModalProviderContext.Provider>
    );
}