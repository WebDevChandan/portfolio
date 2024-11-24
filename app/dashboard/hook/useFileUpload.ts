import { useContext } from "react"
import { FileUploadContext } from "../context/FileUploadProvider"
import { FileType } from "../components/UploadFile";

export const useFileUpload = () => {
    const { isFileUploadPopUp, setIsFileUploadPopUp, setfileUploadInfo } = useContext(FileUploadContext);

    const handleFileUploadPupUp = () => {
        setIsFileUploadPopUp(!isFileUploadPopUp);
    }

    const uploadImage = (uploadFileTitle: string) => {
        try {
            handleFileUploadPupUp();

            setfileUploadInfo({
                uploadTitle: uploadFileTitle,
                fileType: FileType.Image,
            });

        } catch (error) {
            console.log(error);
            throw new Error('useProfile must be used within a ProfileProvider');
        }
    }

    const uploadPDF = (uploadFileTitle: string) => {
        try {
            handleFileUploadPupUp();
            
            setfileUploadInfo({
                uploadTitle: uploadFileTitle,
                fileType: FileType.Document,
            });

        } catch (error) {
            console.log(error);
            throw new Error('useProfile must be used within a ProfileProvider');
        }
    }

    return {
        uploadImage,
        uploadPDF,
    }

}