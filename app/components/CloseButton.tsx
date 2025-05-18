import { Dispatch, SetStateAction } from "react";
import { useModalAction } from "../hook/useModalAction";

export default function CloseButton({ setModalPopupOpen }: { setModalPopupOpen: Dispatch<SetStateAction<boolean>> }) {
    const { isModalLoading } = useModalAction();

    return (
        <div
            className="close-btn outer-shadow hover-in-shadow"
            onClick={() => !isModalLoading ? setModalPopupOpen(false) : null}>
            &times;
        </div>
    )
}
