import { useContext } from "react"
import { FileConfig, FileUploadContext } from "../context/FileUploadProvider"
import { FileType } from "../components/UploadFile";
import { UploadedFileForDB } from "../profile/components/ProfileImage";
import { useModalAction } from "@/app/hook/useModalAction";

export const useFileUpload = () => {
    const { isFileUploadPopUp, setIsFileUploadPopUp, setfileUploadInfo } = useContext(FileUploadContext);

    const handleFileUploadPupUp = () => {
        setIsFileUploadPopUp(!isFileUploadPopUp);
    }

    const uploadImage = (uploadFileTitle: string, uploadImageConfig: FileConfig, isMultiImageNeeded: boolean, handleSaveImage: (param: UploadedFileForDB) => Promise<object | undefined>) => {
        try {
            handleFileUploadPupUp();

            setfileUploadInfo({
                onSave: handleSaveImage,
                uploadTitle: uploadFileTitle,
                fileType: FileType.Image,
                fileConfig: uploadImageConfig,
                isMultiFileNeeded: isMultiImageNeeded
            });


        } catch (error) {
            console.log(error);
            throw new Error('useProfile must be used within a FileUploadProvider');
        }
    }

    const uploadPDF = (uploadFileTitle: string, uploadDocumentConfig: FileConfig, handleSavePDF: (param: UploadedFileForDB) => Promise<object | undefined>) => {
        try {
            handleFileUploadPupUp();

            setfileUploadInfo({
                onSave: handleSavePDF,
                uploadTitle: uploadFileTitle,
                fileType: FileType.Document,
                fileConfig: uploadDocumentConfig
            });

        } catch (error) {
            console.log(error);
            throw new Error('useProfile must be used within a FileUploadProvider');
        }
    }

    return {
        uploadImage,
        uploadPDF,
        setIsFileUploadPopUp
    }

}