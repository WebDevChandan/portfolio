import { useState } from "react";
import Modal from "./Modal";
import UploadFile, { FileType } from "./UploadFile";

export default function UploadResume({ uploadTitle }: { uploadTitle: string }) {
    const [isUploadImagePopup, setIsUploadImagePopup] = useState<boolean>(false);

    const handleResumePopup = () => {
        setIsUploadImagePopup(!isUploadImagePopup);
    }

    return (
        <>
            {/* {blobImage && (isEditable && isUpdateable) && <MdDelete onClick={imageRemove} id="deleteImage" />} */}
            {/* <ImPencil onClick={handleImagePopup} id="uploadImage" /> */}

            <button className="btn-1 outer-shadow inner-shadow" onClick={handleResumePopup}>Upload Resume</button>

            <Modal
                isModelPopUpOpen={isUploadImagePopup}
                setModelPopup={handleResumePopup}
                children=
                {<UploadFile
                    uploadTitle={uploadTitle}
                    fileType={FileType.Document}
                />}
            />
        </>
    )
}
