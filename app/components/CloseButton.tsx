import { Dispatch, SetStateAction } from "react";

export default function CloseButton({ setTogglePopup }: { setTogglePopup: Dispatch<SetStateAction<boolean>> }) {
    return (
        <div className="close-btn outer-shadow hover-in-shadow"
            onClick={() => setTogglePopup(false)}>
            &times;
        </div>
    )
}
