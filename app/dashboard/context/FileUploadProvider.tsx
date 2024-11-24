"use client";
import React, { createContext, Dispatch, SetStateAction, useState } from "react"
import { Modal, UploadFile } from "../components";
import { FileType } from "../components/UploadFile";

interface UploadFileType {
    uploadTitle: string | null;
    fileType: FileType;
}

interface FileUploadContextType extends UploadFileType {
    isFileUploadPopUp: boolean;
    setIsFileUploadPopUp: React.Dispatch<React.SetStateAction<boolean>>
    setfileUploadInfo: React.Dispatch<React.SetStateAction<UploadFileType>>
}

export const FileUploadContext = createContext<FileUploadContextType>({
    fileType: FileType.Image,
    uploadTitle: null,
    setfileUploadInfo: () => { },
    isFileUploadPopUp: false,
    setIsFileUploadPopUp: () => { },
});

export default function FileUploadProvider({ children }: { children: React.ReactNode }) {
    const [isFileUploadPopUp, setIsFileUploadPopUp] = useState<boolean>(false);
    const [fileUploadInfo, setfileUploadInfo] = useState<UploadFileType>({
        uploadTitle: null,
        fileType: FileType.Image,
    });


    return (
        <FileUploadContext.Provider value={{
            ...fileUploadInfo,
            isFileUploadPopUp,
            setfileUploadInfo,
            setIsFileUploadPopUp,
        }}>
            {children}
            <Modal
                isModalPopUpOpen={isFileUploadPopUp}
                setModalPopup={setIsFileUploadPopUp}
                children=
                {<UploadFile
                    uploadTitle={fileUploadInfo.uploadTitle}
                    fileType={fileUploadInfo.fileType}
                />}
            />
        </FileUploadContext.Provider>
    )
}
