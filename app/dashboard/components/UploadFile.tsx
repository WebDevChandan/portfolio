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
import { useModalAction } from "@/app/hook/useModalAction";

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
  fileProgress: number,
  status: {
    isFileUploading: boolean,
    fileUploaded: boolean,
    fileUploadFailed: boolean,
  }
}[]

type UploadFileToCloudType = {
  currentFileInfo: FileInfoType,
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
  const [blobFile, setBlobFile] = useState<string[]>([]);
  const [fileUploading, setFileUploading] = useState({
    isFileUploading: false,
    fileUploaded: false,
    fileUploadFailed: false,
  });
  const [fileInfo, setFileInfo] = useState<FileInfoType>([]);
  const completedUploadsRef = useRef<number[]>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const abortController = useRef(new AbortController());
  const fileDetail = uploadFileDetails[fileType];

  useEffect(() => {
    // Reset File Upload State for New File
    if (fileUploading.fileUploaded && blobFile.length) {
      setFileUploading((prev) => ({
        ...prev,
        isFileUploading: false,
        fileUploaded: false,
        fileUploadFailed: false,
      }));

      console.log(fileUploading);
    }

    // Direct Upload for File Upload or Image/File for Multimedia
    if (FileType.Document === fileType || isMultiFileNeeded) {
      if (blobFile.length) { //&& fileInfo.file instanceof File
        uploadFile(undefined, fileInfo[fileInfo.length - 1]);
      }
    }
  }, [blobFile]);

  useEffect(() => {
    const newlyCompleted = fileInfo
      .map((info, index) => (info.fileProgress === 100 ? index : null))
      .filter((index) => index !== null && !completedUploadsRef.current.includes(index));

    if (newlyCompleted.length > 0) {
      setFileInfo((prevFileInfo) =>
        prevFileInfo.map((info, index) =>
          newlyCompleted.includes(index) ? {
            ...info,
            status: {
              ...fileUploading,
              isFileUploading: false,
              fileUploadFailed: false,
              fileUploaded: true,
            }
          } : info
        )
      );

      completedUploadsRef.current = [...completedUploadsRef.current, ...newlyCompleted.filter((index): index is number => index !== null)];
      setFileUploading((prev) => ({
        ...prev,
        isFileUploading: false,
        fileUploadFailed: false,
        fileUploaded: true,
      }));
    }
  }, [fileInfo]);


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
    console.log(files);

    const handleFileInfo = (file: File, fileName: string, fileSizeInBytes: number) => {
      if (fileSizeInBytes < 1024) {
        setFileInfo((prevFileInfo: FileInfoType) => [
          ...prevFileInfo, {
            file: file,
            fileName: fileName,
            fileSize: `${fileSizeInBytes.toFixed(1)} Bytes`,
            fileUploadURL: "",
            fileProgress: 0,
            status: {
              ...fileUploading,
            }
          }])

      } else if (fileSizeInBytes < 1024 ** 2) {
        const sizeInKB = fileSizeInBytes / 1024;

        setFileInfo((prevFileInfo: FileInfoType) => [
          ...prevFileInfo, {
            file: file,
            fileName: fileName,
            fileSize: `${sizeInKB.toFixed(1)} Bytes`,
            fileUploadURL: "",
            fileProgress: 0,
            status: {
              ...fileUploading,
            }
          }])


      } else if (fileSizeInBytes < 1024 ** 3) {
        const MAX_FILE_SIZE_MB = 4;
        const sizeInMB = fileSizeInBytes / 1024 ** 2;

        //File File Size Exceds 4MB
        if (sizeInMB > MAX_FILE_SIZE_MB) {
          showToast('error', `File Size Exceeds ${MAX_FILE_SIZE_MB}MB`);

          throw new Error(`File Size Exceeds ${MAX_FILE_SIZE_MB}MB`);
        }
        else
          setFileInfo((prevFileInfo: FileInfoType) => [
            ...prevFileInfo, {
              file: file,
              fileName: fileName,
              fileSize: `${sizeInMB.toFixed(1)} Bytes`,
              fileUploadURL: "",
              fileProgress: 0,
              status: {
                ...fileUploading,
              }
            }])

      }
    }

    if (files && files.length) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i] as File;

        const isDuplicateFile = fileInfo.some(prevfile =>
          prevfile.fileName.toLocaleLowerCase() === file.name.toLocaleLowerCase() &&
          prevfile.file?.size === file.size &&
          prevfile.file?.type === file.type
        );

        if (isDuplicateFile) {
          showToast("info", "File Already Uploaded!");
          return;
        }

        try {
          if (FileType.Image === fileType) {
            if (_UploadImageFileType.includes(file.type)) {
              handleFileInfo(file, file.name, file.size);

              const blobUrl = URL.createObjectURL(file);

              setBlobFile((prevBloburl: string[]) => [
                ...prevBloburl,
                blobUrl
              ]);

            } else
              handleUnsupportedFile("Unsupported Image Type");

          }

          if (FileType.Document === fileType) {
            if (file.type === "application/pdf") {
              handleFileInfo(file, file.name, file.size);

              const blobUrl = URL.createObjectURL(file);

              setBlobFile((prevBloburl: string[]) => [
                ...prevBloburl,
                blobUrl
              ]);

            } else
              handleUnsupportedFile("Unsupported File Type");
          }

        } catch (error: any) {
          showToast("error", error.message);
        }
      }

    }
  }

  console.log("fileInfo");
  console.log(fileInfo);

  const pauseUploadingFile = (event: MouseEvent<HTMLDivElement>, [fileInfo]: FileInfoType) => {
    event.preventDefault();
    console.log("pauseUploadingFile Fn - FileInfo");
    console.log(fileInfo);

    if (fileInfo.fileProgress === 0 || fileInfo.status.fileUploadFailed) return;

    //Stopping Upload Process, Only while uploading to Cloud
    if (fileInfo.fileProgress !== 100 && !fileInfo.status.fileUploaded) {
      console.log("Hidding After Upload");
      abortController.current.abort();

      // setFileUploading({
      //   ...fileUploading,
      //   fileUploadFailed: true,
      //   isFileUploading: false,
      // });
    }

    //Need to Delete the Successfully Uploaded File
    if (fileInfo.fileProgress === 100 && fileInfo.status.fileUploaded) {

    }
  }

  const removeFile = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (fileUploading.isFileUploading || fileUploading.fileUploaded) return;

    if (fileUploading.fileUploadFailed) {
      setBlobFile([]);

      if (fileInputRef.current)
        fileInputRef.current.value = "";

      setFileUploading({
        ...fileUploading,
        fileUploadFailed: false,
      })
    }
  }

  console.log(fileUploading);
  // const saveFileToDB = async () => {
  //   if (fileUploading.isFileUploading) return;

  //   if (fileInfo.fileUploadURL) {
  //     setFileUploading((prev) => ({
  //       ...prev,
  //       isFileUploading: true,
  //     }));

  //     try {
  //       if (fileInfo.file instanceof File) {
  //         const { message, errorMessage } = await saveFile({ file: fileInfo.file, uploadedFileURL: fileInfo.fileUploadURL }) as { message?: string, errorMessage?: string };

  //         if (message) showToast("success", message);
  //         if (errorMessage) showToast("error", errorMessage);

  //         setFileUploading((prev) => ({
  //           ...prev,
  //           isFileUploading: false,
  //         }));

  //       } else {
  //         showToast("error", "No File Uploaded");
  //       }

  //     } catch (error) {
  //       showToast("error", "Error Saving File");

  //       setFileUploading((prev) => ({
  //         ...prev,
  //         isFileUploading: false,
  //       }));
  //     }
  //   }
  // }

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
            setFileInfo((prevFileInfo: FileInfoType) =>
              prevFileInfo.map((info) =>
                info.file === CloudFileConfig.file ? { ...info, fileProgress: progress } : info
              )
            );
          }
        },
      }).then(res => res.data);

      if (secure_url) {

        setFileInfo((prevFileInfo: FileInfoType) =>
          prevFileInfo.map((info) =>
            info.file === CloudFileConfig.file ? {
              ...info,
              fileUploadURL: secure_url,
              status: {
                ...fileUploading,
                isFileUploading: false,
                fileUploaded: true,
                fileUploadFailed: false,
              }
            } : info
          )
        );

        setFileUploading((prev) => ({
          ...prev,
          isFileUploading: false,
          fileUploaded: true,
          fileUploadFailed: false,
        }));

        //Checking is there any file Failed while Uploading
        fileInfo.map((file) => {
          if (file.status.fileUploadFailed && file.file !== CloudFileConfig.file) {
            console.log("Still Failed?: " + file.status.fileUploadFailed)
            console.log(file);
            setFileUploading((prev) => ({
              ...prev,
              isFileUploading: false,
              fileUploaded: false,
              fileUploadFailed: true,
            }));
          }
        })
      }

      return secure_url;

    } catch (error) {
      if (axios.Cancel) {
        showToast("info", "File Not Uploaded!");

      } else {
        showToast("info", "File Upload Failed!");
      }

      setFileInfo((prevFileInfo: FileInfoType) =>
        prevFileInfo.map((info) =>
          info.file === CloudFileConfig.file ? {
            ...info,
            status: {
              ...fileUploading,
              fileUploadFailed: true,
              isFileUploading: false,
            }
          } : info
        )
      );

      setFileUploading({
        ...fileUploading,
        fileUploadFailed: true,
        isFileUploading: false,
      });
    }
  }

  const uploadFile = async (event?: MouseEvent<HTMLButtonElement | HTMLDivElement>, currentFile?: FileInfoType[number]) => {

    if (event) {
      event.preventDefault();

      if (fileUploading.isFileUploading || currentFile?.status.isFileUploading) return;
      if (fileUploading.fileUploaded || currentFile?.status.isFileUploading) return;
    }

    //For reUploading File
    if (!currentFile) {
      setFileUploading({
        ...fileUploading,
        isFileUploading: !fileUploading.isFileUploading,
        fileUploadFailed: false,
        fileUploaded: false,
      });

      setFileInfo((prevFileInfo: FileInfoType) =>
        prevFileInfo.map(info => ({
          ...info,
          status: {
            ...fileUploading,
            isFileUploading: !info.status.isFileUploading,
            fileUploadFailed: false,
          }
        }))
      )

    } else {
      setFileUploading({
        ...fileUploading,
        isFileUploading: !fileUploading.isFileUploading,
        fileUploadFailed: false,
        fileUploaded: false,
      });

      setFileInfo((prevFileInfo: FileInfoType) =>
        prevFileInfo.map(info =>
          info.file === currentFile.file ? {
            ...info,
            status: {
              ...fileUploading,
              isFileUploading: !info.status.isFileUploading,
              fileUploadFailed: false,
            }
          } : info)
      )
    }

    for (let i = 0; i < fileInfo.length; i++) {
      const currentFileInfo = fileInfo[i];

      //It came for reupload the current file
      if (currentFile) {
        if (currentFile.file !== currentFileInfo.file)
          continue;
      }

      try {
        if (currentFileInfo.file instanceof File && !currentFileInfo.fileUploadURL) {
          console.log("File Block Executed");

          const imageFileName = currentFileInfo.fileName.match(/^([^\.]+)/)?.[0] ?? null;

          if (FileType.Image === fileType) {
            const transformationString = `c_fill,f_auto,g_auto,q_auto:best,w_${fileConfig?.width},h_${fileConfig?.height}`;
            const upload_preset = 'my_image_preset';

            const file_metadata = `caption=${imageFileName} | alt=${imageFileName}`;

            const { api_key, timestamp, signature } = await signUploadFile(fileConfig?.folderName as string, upload_preset, file_metadata, transformationString);

            try {
              if (api_key && timestamp && signature) {
                await uploadFileToCloud({
                  currentFileInfo: [currentFileInfo],
                  file: currentFileInfo.file,
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
                  currentFileInfo: [currentFileInfo],
                  file: currentFileInfo.file,
                  upload_preset: upload_preset,
                  api_key: api_key,
                  timestamp: `${timestamp}`,
                  signature: signature,
                  file_metadata: file_metadata
                });

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
  }

  const reloadToUploadFile = async ([currentFile]: FileInfoType, event?: MouseEvent<HTMLButtonElement | HTMLDivElement>) => {
    if (event) {
      event.preventDefault();

      if (currentFile.status.isFileUploading) return;
      if (currentFile.status.fileUploaded) return;
    }

    uploadFile(undefined, currentFile);
  }

  return (
    <div className="add-content-container">
      <div className="content-header" style={{ margin: "10px" }}>
        <div className="content-label">{uploadTitle}</div>
      </div>

      <div className="add-content" style={{ margin: "0px 0px 10px" }}>
        {!blobFile.length
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
          : FileType.Image === fileType && !fileUploading.isFileUploading && !fileUploading.fileUploaded && !fileUploading.fileUploadFailed &&
          <div className="pre-render">
            <MyImage src={blobFile[0]} />
          </div>}

        {blobFile.length > 0 && (fileType !== FileType.Image || fileUploading.isFileUploading || fileUploading.fileUploaded || fileUploading.fileUploadFailed) &&
          fileInfo.map((fileInfo, index) => (
            <div className="file-info-container" key={index}>
              <div className="file-icon">
                {fileDetail.icon}
              </div>

              <div className="file-info">
                <div className="file-info-header">
                  <p className="file-name">{fileInfo.fileName}</p>

                  {(fileInfo.status.isFileUploading && !fileInfo.fileUploadURL) && (<div className="file-uploadpause-icon" onClick={(event) => pauseUploadingFile(event, [fileInfo])}><MdOutlineDelete color="#cc3a3b" cursor="pointer" /></div>)}
                  {(fileInfo.status.fileUploadFailed && !fileInfo.status.isFileUploading && !fileInfo.fileUploadURL) && (!fileInfo.status.fileUploaded && fileInfo.fileProgress !== 100) && (<div className="file-reupload-icon" onClick={(event) => reloadToUploadFile([fileInfo], event)}><RxReload color="#808080" cursor="pointer" /></div>)}
                </div>

                <div className="file-progress progress inner-shadow">
                  <div className={`progress-bar${fileInfo.fileProgress === 100 ? ' success-bar' : fileInfo.status.fileUploadFailed ? ' failed-bar' : ''}`} style={{ width: `calc(${fileInfo.fileProgress}% - 14px)` }}></div>
                </div>

                <div className="file-info-bottom">
                  <p className="file-size">{fileInfo.fileSize}</p>
                  <p className="file-progress-count"> {fileInfo.fileProgress}%</p>
                </div>
              </div>

              {(fileInfo.status.fileUploaded || fileInfo.fileProgress === 100) && <div className="file-delete-icon"><MdDelete color="#cc3a3b" cursor="pointer" /></div>}

            </div>
          ))
        }

        <input
          type="file"
          name="fileUpload"
          onChange={handleInitialUploadFile}
          accept={FileType.Image === fileType ? ".webp,.png,.jpeg" : ".pdf"}
          ref={fileInputRef}
          hidden={true}
          disabled={fileUploading.isFileUploading}
          multiple={isMultiFileNeeded}
        />

      </div>

      <div className="modal-btn">
        {blobFile.length > 0
          &&
          <>
            <button
              className={`btn-1 outer-shadow ${fileUploading.isFileUploading ? "btn-disabled-withoutLoading" : "hover-in-shadow"}`}
              onClick={handleClickFileInput}
              disabled={fileUploading.isFileUploading}
            >
              {isMultiFileNeeded ? "Add" : "New"}
              {FileType.Image === fileType ? " Image" : " File"}
            </button>

            {(fileUploading.fileUploaded) ? (
              <button
                className={`btn-1 outer-shadow ${fileUploading.isFileUploading ? "btn-disabled" : "hover-in-shadow"}`}
                disabled={fileUploading.isFileUploading || !fileUploading.fileUploaded}
              // onClick={saveFileToDB}
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