"use client";
import { MyImage } from "@/app/components";
import ServerSpinLoader from "@/app/components/Loader/ServerSpinLoader";
import { showToast } from "@/utils/showToast";
import { ChangeEvent, MouseEvent, MouseEventHandler, useEffect, useRef, useState } from "react";
import { FaFilePdf, FaImage } from "react-icons/fa";
import { MdDelete, MdOutlineDelete } from "react-icons/md";
import { FileConfig } from "../context/FileUploadProvider";
import { signUploadFile, uploadImageAction, uploadImageWithProgress, uploadPDFAction } from "../server/uploadFileAction";
import '../styles/uploadFile.scss';
import axios from "axios";
import { RxReload } from "react-icons/rx";
import { useFileUpload } from "../hook/useFileUpload";
import { UploadedFileForDB } from "../profile/components/ProfileImage";

export enum FileType {
  Image,
  Document
}

export type UploadFileType = {
  uploadTitle: string | null,
  fileType: FileType,
  fileConfig: FileConfig | null,
  isMultiFileNeeded?: boolean,
  saveFile: (uploadedFileForDB: UploadedFileForDB) => Promise<object | undefined>,
}

export type FileInfoType = {
  file: File | null,
  fileName: string,
  fileSize: string,
  fileUploadURL: string,
}

type UploadFileToCloudType = {
  file: File,
  upload_preset: string,
  api_key: string,
  timestamp: string,
  signature: string,
  file_metadata: string
  transformationString?: string,
}

export const _UploadImageFileType = ["image/webp", "image/png", "image/jpg", "image/jpeg"];

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


export default function UploadFile({ uploadTitle, fileType, fileConfig, isMultiFileNeeded, saveFile }: UploadFileType) {
  const [blobFile, setBlobFile] = useState<string | undefined>(undefined);
  const [fileUploading, setFileUploading] = useState({
    isFileUploading: false,
    fileUploaded: false,
    fileUploadFailed: false,
    fileProgress: 0,
  });
  const [fileInfo, setFileInfo] = useState<FileInfoType>({
    file: null,
    fileName: "",
    fileSize: "",
    fileUploadURL: "",
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const abortController = useRef(new AbortController());
  const fileDetail = uploadFileDetails[fileType];

  useEffect(() => {
    // Reset File Upload State for New File
    if (fileUploading.fileUploaded && blobFile) {
      console.log("new File Uploaded");
      setFileUploading((prev) => ({
        ...prev,
        isFileUploading: false,
        fileUploaded: false,
        fileUploadFailed: false,
        fileProgress: 0,
      }));

      console.log(fileUploading);
    }

    // Direct Upload for File Upload
    if (FileType.Document === fileType) {
      if (blobFile && fileInfo.file instanceof File) {
        uploadFile();
      }
    }
  }, [blobFile]);

  useEffect(() => {
    if (fileUploading.fileProgress === 100) {
      setFileUploading((prev) => ({
        ...prev,
        isFileUploading: false,
        fileUploadFailed: false,
        fileUploaded: true,
      }));
    }
  }, [fileUploading.fileProgress])


  const handleClickFileInput = () => {
    if (fileUploading.isFileUploading) return;

    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }

  const handleUnsupportedFile = (errorMessage: string) => {
    showToast("error", errorMessage);

    if (fileInputRef.current)
      fileInputRef.current.value = "";
  }

  const handleInitialUploadFile = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    const handleFileInfo = (file: File, fileName: string, fileSizeInBytes: number) => {
      if (fileSizeInBytes < 1024) {
        setFileInfo({
          ...fileInfo,
          file: file,
          fileName: fileName,
          fileSize: `${fileSizeInBytes.toFixed(1)} Bytes`,
        })

      } else if (fileSizeInBytes < 1024 ** 2) {
        const sizeInKB = fileSizeInBytes / 1024;

        setFileInfo({
          ...fileInfo,
          file: file,
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
            file: file,
            fileSize: `${sizeInMB.toFixed(1)} MB`,
          })

      }
    }

    if (files && files.length > 0) {
      const file = files[0] as File;

      try {
        if (FileType.Image === fileType) {
          console.log(file.type);
          if (_UploadImageFileType.includes(file.type)) {
            handleFileInfo(file, file.name, file.size);

            const blobUrl = URL.createObjectURL(file);

            setBlobFile(blobUrl);

          } else
            handleUnsupportedFile("Unsupported Image Type");
        }

        if (FileType.Document === fileType) {
          if (file.type === "application/pdf") {
            handleFileInfo(file, file.name, file.size);

            const blobUrl = URL.createObjectURL(file);

            setBlobFile(blobUrl);

          } else
            handleUnsupportedFile("Unsupported File Type");
        }
      } catch (error: any) {
        showToast("error", error.message);
      }

    }

  }

  const pauseUploadingFile = (event: MouseEvent<HTMLDivElement>) => {
    event.preventDefault();

    if (fileUploading.fileProgress === 0 || fileUploading.fileUploadFailed) return;

    //Stopping Upload Process, Only while uploading to Cloud
    if (fileUploading.fileProgress !== 100 && !fileUploading.fileUploaded) {
      console.log("Hidding After Upload");
      abortController.current.abort();

      // setFileUploading({
      //   ...fileUploading,
      //   fileUploadFailed: true,
      //   isFileUploading: false,
      // });
    }

    //Need to Delete the Successfully Uploaded File
    if (fileUploading.fileProgress === 100 && fileUploading.fileUploaded) {

    }
  }

  const removeFile = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (fileUploading.isFileUploading || fileUploading.fileUploaded) return;

    if (fileUploading.fileUploadFailed) {
      setBlobFile(undefined);

      if (fileInputRef.current)
        fileInputRef.current.value = "";

      setFileUploading({
        ...fileUploading,
        fileUploadFailed: false,
      })
    }

  }

  console.log(fileUploading);
  const saveFileToDB = async () => {
    if (fileUploading.isFileUploading) return;

    if (fileInfo.fileUploadURL) {
      setFileUploading((prev) => ({
        ...prev,
        isFileUploading: true,
      }));

      try {
        if (fileInfo.file instanceof File) {
          const { message, errorMessage } = await saveFile({ file: fileInfo.file, uploadedFileURL: fileInfo.fileUploadURL }) as { message?: string, errorMessage?: string };

          if (message) showToast("success", message);
          if (errorMessage) showToast("error", errorMessage);

          setFileUploading((prev) => ({
            ...prev,
            isFileUploading: false,
          }));

        } else {
          showToast("error", "No File Uploaded");
        }

      } catch (error) {
        showToast("error", "Error Saving File");

        setFileUploading((prev) => ({
          ...prev,
          isFileUploading: false,
        }));
      }
    }
  }

  const uploadFileToCloud = async ({ ...CloudFileConfig }: UploadFileToCloudType) => {
    if (abortController.current)
      abortController.current = new AbortController();

    const formData = new FormData();

    formData.append('folder', `${fileConfig?.folderName}`);
    formData.append("upload_preset", CloudFileConfig.upload_preset);
    CloudFileConfig.transformationString ? formData.append('transformation', CloudFileConfig.transformationString) : null;
    formData.append('context', CloudFileConfig.file_metadata);
    formData.append("file", CloudFileConfig.file);
    formData.append("cloud_name", `${process.env.CLOUDINARY_CLOUD_NAME}`);
    formData.append('api_key', `${CloudFileConfig.api_key}`);
    formData.append('signature', `${CloudFileConfig.signature}`);
    formData.append('timestamp', `${CloudFileConfig.timestamp}`);

    try {
      const { secure_url } = await axios.post(`https://api.cloudinary.com/v1_1/dnwf21zlv/image/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        signal: abortController.current.signal,
        onUploadProgress: (event) => {
          if (event.total) {
            const progress = Math.round((event.loaded / event.total) * 100);
            setFileUploading((prev) => ({
              ...prev,
              fileProgress: progress,
            }));
          }
        },
      }).then(res => res.data);

      if (secure_url) {
        setFileInfo({
          ...fileInfo,
          fileUploadURL: secure_url,
        });

        setFileUploading((prev) => ({
          ...prev,
          isFileUploading: false,
          fileUploaded: true,
        }));
      }

      return secure_url;

    } catch (error) {
      if (axios.Cancel) {
        showToast("info", "File Not Uploaded!");

      } else {
        showToast("info", "File Upload Failed!");
      }

      setFileUploading({
        ...fileUploading,
        fileUploadFailed: true,
        isFileUploading: false,
      });
    }
  }

  const uploadFile = async (event?: MouseEvent<HTMLButtonElement | HTMLDivElement>) => {

    if (event) {
      event.preventDefault();

      if (fileUploading.isFileUploading) return;
      if (fileUploading.fileUploaded) return;
    }

    setFileUploading({
      ...fileUploading,
      isFileUploading: !fileUploading.isFileUploading,
      fileUploadFailed: false,
      fileUploaded: false,
    });

    try {
      if (fileInfo.file instanceof File) {
        console.log("File Block Executed");

        const imageFileName = fileInfo.fileName.match(/^([^\.]+)/)?.[0] ?? null;

        if (FileType.Image === fileType) {
          const transformationString = `c_fill,f_auto,g_auto,q_auto:best,w_${fileConfig?.width},h_${fileConfig?.height}`;
          const upload_preset = 'my_image_preset';

          const file_metadata = `caption=${imageFileName} | alt=${imageFileName}`;

          const { api_key, timestamp, signature } = await signUploadFile(fileConfig?.folderName as string, upload_preset, file_metadata, transformationString);

          try {
            if (api_key && timestamp && signature) {
              await uploadFileToCloud({
                file: fileInfo.file,
                upload_preset: upload_preset,
                api_key: api_key,
                timestamp: `${timestamp}`,
                signature: signature,
                transformationString: transformationString,
                file_metadata: file_metadata
              });

              // const { message } = await uploadImageAction(formData, fileConfig) as { message: string };

              // showToast("success", message);
            } else
              console.log("Unauthorized access")

          } catch (error: any) {
            console.error("Upload failed", error?.response?.data.error.message);
          }

        }

        if (FileType.Document === fileType) {
          console.log("Document Block Executed");

          const upload_preset = 'my_pdf_preset';
          const file_metadata = `caption=${imageFileName} | alt=${imageFileName}`;

          const { api_key, timestamp, signature } = await signUploadFile(fileConfig?.folderName as string, upload_preset, file_metadata);

          try {
            if (api_key && timestamp && signature) {
              await uploadFileToCloud({
                file: fileInfo.file,
                upload_preset: upload_preset,
                api_key: api_key,
                timestamp: `${timestamp}`,
                signature: signature,
                file_metadata: file_metadata
              });

              // const { message, errorMessage } = await uploadPDFAction(formData, fileConfig) as { message?: string, errorMessage: string };

              // if (message)
              //   showToast("success", message);

              // if (errorMessage)
              //   showToast("error", errorMessage);

            } else
              console.log("Unauthorized access")

          } catch (error: any) {
            console.error("Upload failed", error?.response?.data.error.message);
          }
        }
      }

    } catch (error) {
      console.log('Error Uploading File:', error);
      showToast("error", "Error Uploading File");

      setFileUploading({
        ...fileUploading,
        isFileUploading: !fileUploading.isFileUploading,
        fileUploaded: false,
      });

      throw new Error("Error Uploading File");
    }

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
          : FileType.Image === fileType && !fileUploading.isFileUploading && !fileUploading.fileUploaded && !fileUploading.fileUploadFailed
          &&
          <div className="pre-render">
            <MyImage src={blobFile} />
          </div>}

        {blobFile && (fileType !== FileType.Image || fileUploading.isFileUploading || fileUploading.fileUploaded || fileUploading.fileUploadFailed) &&
          <div className="file-info-container">
            <div className="file-icon">
              {fileDetail.icon}
            </div>

            <div className="file-info">
              <div className="file-info-header">
                <p className="file-name">{fileInfo.fileName}</p>

                {fileUploading.isFileUploading && (<div className="file-uploadpause-icon" onClick={pauseUploadingFile}><MdOutlineDelete color="#cc3a3b" cursor="pointer" /></div>)}
                {(fileUploading.fileUploadFailed && !fileUploading.isFileUploading) && (!fileUploading.fileUploaded && fileUploading.fileProgress !== 100) && (<div className="file-reupload-icon" onClick={uploadFile}><RxReload color="#808080" cursor="pointer" /></div>)}
              </div>

              <div className="file-progress progress inner-shadow">
                <div className={`progress-bar${fileUploading.fileProgress === 100 ? ' success-bar' : fileUploading.fileUploadFailed ? ' failed-bar' : ''}`} style={{ width: `calc(${fileUploading.fileProgress}% - 14px)` }}></div>
              </div>

              <div className="file-info-bottom">
                <p className="file-size">{fileInfo.fileSize}</p>
                <p className="file-progress-count"> {fileUploading.fileProgress}%</p>
              </div>
            </div>

            {fileUploading.fileUploaded && <div className="file-delete-icon"><MdDelete color="#cc3a3b" cursor="pointer" /></div>}

          </div>}

        <input
          type="file"
          name="fileUpload"
          onChange={handleInitialUploadFile}
          accept={FileType.Image === fileType ? ".webp,.png,.jpeg" : ".pdf"}
          ref={fileInputRef}
          hidden={true}
          disabled={fileUploading.isFileUploading}
        />

      </div>

      <div className="modal-btn">
        {blobFile
          &&
          <>
            <button
              className={`btn-1 outer-shadow ${fileUploading.isFileUploading ? "btn-disabled-withoutLoading" : "hover-in-shadow"}`}
              onClick={handleClickFileInput}
              disabled={fileUploading.isFileUploading}
            >
              New
              {FileType.Image === fileType ? " Image" : " File"}
            </button>

            {(fileUploading.fileUploaded) ? (
              <button
                className={`btn-1 outer-shadow ${fileUploading.isFileUploading ? "btn-disabled" : "hover-in-shadow"}`}
                disabled={fileUploading.isFileUploading || !fileUploading.fileUploaded}
                onClick={saveFileToDB}
              >
                {fileUploading.isFileUploading && <ServerSpinLoader />}
                Save
                {FileType.Image === fileType ? " Image" : " File"}
              </button>
            ) : (
              <>
                {!fileUploading.fileUploadFailed
                  ? <button
                    className={`btn-1 outer-shadow ${fileUploading.isFileUploading ? "btn-disabled" : "hover-in-shadow"}`}
                    disabled={fileUploading.isFileUploading || fileUploading.fileUploaded}
                    onClick={uploadFile}
                  >
                    {fileUploading.isFileUploading && <ServerSpinLoader />}
                    Upload
                    {FileType.Image === fileType ? " Image" : " File"}
                  </button>

                  : <button
                    className={`btn-1 outer-shadow ${fileUploading.isFileUploading ? "btn-disabled" : "hover-in-shadow"}`}
                    disabled={fileUploading.isFileUploading || fileUploading.fileUploaded}
                    onClick={removeFile}
                  >
                    {fileUploading.isFileUploading && <ServerSpinLoader />}
                    Remove
                    {FileType.Image === fileType ? " Image" : " File"}
                  </button>}
              </>
            )}

          </>}
      </div>
    </div >
  )
}