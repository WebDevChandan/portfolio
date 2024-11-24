"use client";
import { MyImage } from "@/app/components";
import { showToast } from "@/utils/showToast";
import { ChangeEvent, useRef, useState } from "react";
import { FaFilePdf, FaImage } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import '../styles/uploadFile.scss';

export enum FileType {
  Image,
  Document
}

export type UploadFileType = {
  uploadTitle: string | null,
  fileType: FileType,
}

type FileInfoType = {
  fileName: string,
  fileSize: string,
  fileProgress: number,
}

const uploadFileDetails = {
  [FileType.Image]: {
    icon: <FaImage />,
    supportText: "Supports: WEBP",
    type: "Image",
  },
  [FileType.Document]: {
    icon: <FaFilePdf />,
    supportText: "Supports: PDF",
    type: "File",
  }
}

export default function UploadFile({ uploadTitle, fileType }: UploadFileType) {
  const [isFileUploading, setIsFileUploading] = useState<boolean>(false);
  const [blobFile, setBlogFile] = useState<string | undefined>(undefined);
  const [fileInfo, setFileInfo] = useState<FileInfoType>({
    fileName: "",
    fileSize: "",
    fileProgress: 0,
  });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const fileDetail = uploadFileDetails[fileType] ;

  const handleClickFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }

  const handleUploadFile = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    const handleUnsupportedFile = (errorMessage: string) => {
      showToast("error", errorMessage);

      if (fileInputRef.current)
        fileInputRef.current.value = "";
    }

    const handleFileInfo = (fileName: string, fileSizeInBytes: number) => {
      if (fileSizeInBytes < 1024) {
        setFileInfo({
          ...fileInfo,
          fileName: fileName,
          fileSize: `${fileSizeInBytes.toFixed(1)} Bytes`,
        })

      } else if (fileSizeInBytes < 1024 ** 2) {
        const sizeInKB = fileSizeInBytes / 1024;

        setFileInfo({
          ...fileInfo,
          fileName: fileName,
          fileSize: `${sizeInKB.toFixed(1)} KB`,
        })

      } else if (fileSizeInBytes < 1024 ** 3) {
        const MAX_FILE_SIZE_MB = 4;
        const sizeInMB = fileSizeInBytes / 1024 ** 2;

        //File File Size Exceds 4MB
        if (sizeInMB > MAX_FILE_SIZE_MB)
          throw new Error(`File Size Exceeds ${MAX_FILE_SIZE_MB}MB`);
        else
          setFileInfo({
            ...fileInfo,
            fileName: fileName,
            fileSize: `${sizeInMB.toFixed(1)} MB`,
          })

      }
    }



    if (files && files.length > 0) {
      const file = files[0];

      try {
        if (FileType.Image === fileType) {
          if (file.type === "image/webp") {
            handleFileInfo(file.name, file.size);

            const blobUrl = URL.createObjectURL(file);

            setBlogFile(blobUrl);
          } else
            handleUnsupportedFile("Unsupported Image Type");
        }

        if (FileType.Document === fileType) {
          if (file.type === "application/pdf") {
            handleFileInfo(file.name, file.size);

            const blobUrl = URL.createObjectURL(file);

            setBlogFile(blobUrl);
          } else
            handleUnsupportedFile("Unsupported File Type");
        }
      } catch (error: any) {
        showToast("error", error.message);
      }

    }
  }

  const removeFile = () => {
    if (isFileUploading) setIsFileUploading(false);

    setBlogFile(undefined);

    if (fileInputRef.current)
      fileInputRef.current.value = "";
  }

  const uploadFile = () => {
    if (isFileUploading) return;

    setIsFileUploading(true);

    //Handle to Upload File to DB...
  }

  return (
    <div className="add-content-container">
      <div className="content-header" style={{ margin: "10px" }}>
        <div className="content-label">{uploadTitle}</div>
      </div>

      <div className="add-content" style={{ margin: "0px 0px 10px" }}>
        {!blobFile
          ? <div className="upload-container">
            <div className="upload-icon">
              {fileDetail.icon}
            </div>
            <div className="upload-msg">
              <p className="msg-1">{fileDetail.supportText}</p>
              <p className="msg-2">Drag & Drop your {fileDetail.type} or</p>
            </div>
            <div className="btn-1 outer-shadow hover-in-shadow" onClick={handleClickFileInput}>Browse {fileDetail.type}</div>
          </div>
          : FileType.Image === fileType && !isFileUploading
          && <div className="pre-render">
            <MyImage src={blobFile} />
          </div>}

        {blobFile && (fileType !== FileType.Image || isFileUploading) && <div className="file-info-container">
          <div className="file-icon">
            {fileDetail.icon}
          </div>

          <div className="file-info">
            <div className="file-info-header">
              <p className="file-name">{fileInfo.fileName}</p>
              <div className="file-delete-icon"><MdDelete color="#cc3a3b" cursor="pointer" onClick={removeFile} /></div>
            </div>

            <div className="file-progress progress inner-shadow">
              <div className="progress-bar" style={{ width: `${fileInfo.fileProgress}%` }}></div>
            </div>

            <div className="file-info-bottom">
              <p className="file-size">{fileInfo.fileSize}</p>
              <p className="file-progress-count"> {fileInfo.fileProgress}%</p>
            </div>
          </div>

        </div>}

        <input
          type="file"
          name="fileUpload"
          onChange={handleUploadFile}
          accept={FileType.Image === fileType ? ".webp" : ".pdf"}
          ref={fileInputRef}
          hidden={true}
        // disabled={!isEditable && !isUpdateable}
        />

      </div>

      <div className="modal-btn">
        {blobFile
          &&
          <>
            <button className={`btn-1 outer-shadow ${isFileUploading ? "btn-disabled" : "hover-in-shadow"}`} onClick={handleClickFileInput} disabled={isFileUploading}>Change {FileType.Image === fileType ? "Image" : "File"}</button>
            <button className={`btn-1 outer-shadow ${isFileUploading ? "btn-disabled" : "hover-in-shadow"}`} disabled={isFileUploading} onClick={uploadFile}>{isFileUploading ? "Uploading" : "Upload"} {FileType.Image === fileType ? "Image" : "File"}</button>
          </>}
      </div>
    </div>
  )
}
