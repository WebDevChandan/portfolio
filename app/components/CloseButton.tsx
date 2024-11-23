import { Dispatch, SetStateAction } from "react";

export default function CloseButton({ setModelPopup }: { setModelPopup: Dispatch<SetStateAction<boolean>> }) {
    return (
        <div className="close-btn outer-shadow hover-in-shadow"
            onClick={() => setModelPopup(false)}>
            &times;
        </div>
    )
}
