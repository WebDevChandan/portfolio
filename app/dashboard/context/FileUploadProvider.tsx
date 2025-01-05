"use client";
import React, { createContext, Dispatch, MouseEvent, SetStateAction, useState } from "react"
import { Modal, UploadFile } from "../components";
import { FileInfoType, FileType } from "../components/UploadFile";
import { UploadedFileForDB } from "../profile/components/ProfileImage";

export type FileConfig = {
    folderName: string,
    width?: number,
    height?: number,
}

interface UploadFileType {
    uploadTitle: string | null;
    fileType: FileType;
    fileConfig: FileConfig | null;
    isMultiFileNeeded?: boolean;
    onSave: (param: UploadedFileForDB) => Promise<object | undefined>,
}

interface FileUploadContextType extends UploadFileType {
    isFileUploadPopUp: boolean;
    setIsFileUploadPopUp: React.Dispatch<React.SetStateAction<boolean>>
    setfileUploadInfo: React.Dispatch<React.SetStateAction<UploadFileType>>
}

export const FileUploadContext = createContext<FileUploadContextType>({
    fileType: FileType.Image,
    uploadTitle: null,
    fileConfig: null,
    isMultiFileNeeded: false,
    onSave: (param: UploadedFileForDB) => Promise.resolve(undefined),
    setfileUploadInfo: () => { },
    isFileUploadPopUp: false,
    setIsFileUploadPopUp: () => { },
});

export default function FileUploadProvider({ children }: { children: React.ReactNode }) {
    const [isFileUploadPopUp, setIsFileUploadPopUp] = useState<boolean>(false);
    const [fileUploadInfo, setfileUploadInfo] = useState<UploadFileType>({
        uploadTitle: null,
        fileType: FileType.Image,
        fileConfig: null,
        isMultiFileNeeded: false,
        onSave: (param: UploadedFileForDB) => Promise.resolve(undefined),
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
                    fileConfig={fileUploadInfo.fileConfig}
                    isMultiFileNeeded={fileUploadInfo.isMultiFileNeeded}
                    saveFile={fileUploadInfo.onSave}
                />}
            />
        </FileUploadContext.Provider>
    )
}
