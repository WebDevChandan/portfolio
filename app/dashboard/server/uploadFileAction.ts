'use server';

import { v2 as cloudinary } from 'cloudinary';
import { FileConfig } from "../context/FileUploadProvider";
import axios from 'axios';
import { isValidToken } from './isValidToken';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
});

export async function uploadImageAction(formData: FormData, imageConfig: FileConfig | null) {
    const imageFile = formData.get('fileUpload') as File;

    if (imageFile.type === "image/webp") {
        try {
            const imageFileName = imageFile?.name.match(/^([^\.]+)/)?.[0] ?? null;

            //If the image is already existing in the current folder, no need to upload/overwrite it (but i want to overwrite)
            // const existingImage = await cloudinary.api.resource(`${imageConfig.folderName}/${imageFileName}`);
            // if (existingImage) {
            //     return existingImage;
            // }

            const arrayBuffer = await imageFile.arrayBuffer();
            const bufferImage = new Uint8Array(arrayBuffer);

            await new Promise((resolve, reject) => {
                cloudinary.uploader.upload_stream({
                    // tags: ['GoChat-Dashboard'],              //Uses: Project Screenshots by - await cloudinary.api.resources_by_tag('GoChat-Dashboard',{})
                    public_id: imageFileName as string,
                    folder: imageConfig?.folderName,
                    transformation: [
                        {
                            quality: 'auto',
                            fetch_format: 'webp',
                        }, {
                            width: imageConfig?.width,
                            height: imageConfig?.height,
                            crop: 'fill',
                            gravity: 'auto',
                        }
                    ]
                }, function (error, result) {
                    if (error) {
                        reject(error);
                        return;
                    }
                    resolve(result);
                }).end(bufferImage);
            })

            return { "message": "Image Uploaded Successfully!" };

        } catch (error) {
            console.error("Error Uploading Image: ", error);
            return { "errorMessage": "Image Upload Failed!" };
        }

    } else {
        return { "errorMessage": "Unsupported Image Type" };
    }

}

export async function uploadPDFAction(formData: FormData, pdfConfig: FileConfig | null) {
    const pdfFile = formData.get('fileUpload') as File;
    if (pdfFile.type === "application/pdf") {
        try {
            const pdfFileName = pdfFile?.name.match(/^([^\.]+)/)?.[0] ?? null;
            const arrayBuffer = await pdfFile.arrayBuffer();
            const bufferPDF = new Uint8Array(arrayBuffer);

            await new Promise((resolve, reject) => {
                cloudinary.uploader.upload_stream({
                    public_id: pdfFileName as string,
                    folder: pdfConfig?.folderName,
                }, function (error, result) {
                    if (error) {
                        reject(error);
                        return;
                    }
                    resolve(result);
                }).end(bufferPDF);
            });

            return { "message": "PDF Uploaded Successfully!" };


        } catch (error) {
            console.error("Error Uploading Document: ", error);
            return { "errorMessage": "PDF Upload Failed!" };

        }

    } else {
        return { "errorMessage": "Unsupported Document Type" };
    }

}


export async function uploadImageWithProgress(
    formData: FormData,
) {

    try {
        //   const imageFileName = imageFile?.name.match(/^([^\.]+)/)?.[0] ?? null;

        // Append required fields to formData

        // API call
        const uploadResponse = await axios.post(
            'https://api.cloudinary.com/v1_1/dnwf21zlv/image/upload',
            formData,
            {
                onUploadProgress: (event) => {
                    if (event.total) {
                        const progress = Math.round((event.loaded / event.total) * 100);
                        return progress;
                    }
                },
            },

        );


        // console.log(uploadResponse);
        //   if (uploadResponse.data) {
        //     return { message: 'Image Uploaded Successfully!', result: uploadResponse.data };
        //   }
    } catch (error) {
        console.error('Error Uploading Image: ', error);
        return { errorMessage: 'Image Upload Failed!' };
    }

}

export async function signUploadFile(folder: string, upload_preset: string, file_metadata: string, transformation?: string) {
    const isTokenValid = await isValidToken();

    if (!isTokenValid)
        return { "errorMessage": "Invalid Token!" };

    const timestamp = Math.round((new Date()).getTime() / 1000);

    if (!process.env.CLOUDINARY_API_SECRET) {
        throw new Error("CLOUDINARY_API_SECRET is not defined");
    }

    try {
        const signature = cloudinary.utils.api_sign_request({
            timestamp: timestamp,
            folder: folder,
            upload_preset: upload_preset,
            transformation: transformation,
            context: file_metadata,
        }, process.env.CLOUDINARY_API_SECRET);

        const api_key = process.env.CLOUDINARY_API_KEY;

        return { api_key, timestamp, signature };

    } catch (error) {
        console.error("Error Uploading Image: ", error);
        return { "errorMessage": "Image Upload Failed!" };
    }
}


export async function deleteFile(public_id: string) {
    return await cloudinary.uploader.destroy(public_id)
        .then(resolve => {
            if (resolve.result === "ok")
                return { message: "File Deleted Successfully!" };
            else
                return { info: "File Not Found!" };
        })
        .catch(error => {
            console.error(error);
            return { errorMessage: "Error Deleting File!" };
        });
}

//-- Upload Image by URL Path:-
// const imagePath = 'https://cloudinary-devs.github.io/cld-docs-assets/assets/images/happy_people.jpg';
// const result = await cloudinary.uploader.upload(imagePath, options);


//-- Geting from Cloudinary and transforming to rendering:-
// const transformedResult = cloudinary.url('happy_people', {
//     transformation: [
//         {
//             quality: 'auto',
//             fetch_format: 'auto',
//         }, {
//             width: 500,
//             height: 500,
//             crop: 'fill',
//             gravity: 'auto',
//         }
//     ]
// });



// const updatedProfileData = await req.json() as ProfileType;

// await prisma.personalInfo.updateMany({
//     data: {
//         ...updatedProfileData
//     }
// })

/*
 const buffer = await req.json();
        // console.log("imageFile", buffer);

        const options = {
            use_filename: true,
            unique_filename: false,
            overwrite: true,
        };

        // const arrayBuffer = await imageFile.arrayBuffer();
        // const bufferImage = new Uint8Array(arrayBuffer);

        //-- Upload Raw Image by ImageBuffering:-
        await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream({}, function (error, result) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            }).end(buffer);
        })*/