import { Dispatch, SetStateAction } from "react";

export default function CloseButton({ setModalPopup }: { setModalPopup: Dispatch<SetStateAction<boolean>> }) {
    return (
        <div className="close-btn outer-shadow hover-in-shadow"
            onClick={() => setModalPopup(false)}>
            &times;
        </div>
    )
}
