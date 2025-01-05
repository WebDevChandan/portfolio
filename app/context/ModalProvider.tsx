"use client";
import { createContext, Dispatch, SetStateAction, useState } from "react";

interface ModalProviderContext {
    modalPopup: boolean;
    setModalPopup: Dispatch<SetStateAction<boolean>>;
}

export const ModalProviderContext = createContext<ModalProviderContext>({
    modalPopup: false,
    setModalPopup: () => { },
});

export default function ModalProvider({ children }: { children: React.ReactNode }) {
    const [modalPopup, setModalPopup] = useState(false);

    return (
        <ModalProviderContext.Provider value={{ modalPopup, setModalPopup }}>
            {children}
        </ModalProviderContext.Provider>
    );
}