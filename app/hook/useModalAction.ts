import { useContext } from "react"
import { ModalProviderContext } from "../context/ModalProvider"

export const useModalAction = () => {
    const context = useContext(ModalProviderContext);

    if (!context) {
        throw new Error("useModalAction must be used within a ModalProvider");
    }

    return context;
}