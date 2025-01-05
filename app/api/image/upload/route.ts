import prisma from "@/utils/prisma";
import validator from 'validator';
import * as jose from 'jose';
import bcrypt from 'bcrypt';
import { cookies } from "next/headers";
import jwt from 'jsonwebtoken';
import { NextResponse } from "next/server";
import { ProfileType } from "@/app/dashboard/profile/page";
import { v2 as cloudinary } from 'cloudinary';
import axios from "axios";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
});

export async function PUT(req: Request) {
    try {
        if (req.method !== "PUT") {
            return Response.json(
                { error: "Method Not Allowed" },
                { status: 405 },
            )
        }

        // const token = req.headers.get("authorization") as string;

        // if (!token) {
        //     return NextResponse.json(
        //         { errorMessage: "Unauthorized Access" },
        //         { status: 401 },
        //     );
        // }

        // try {
        //     jwt.verify(token, `${process.env.JWT_SECRET}`);

        // } catch (error: any) {
        //     return NextResponse.json(
        //         { errorMessage: error?.message },
        //         { status: 401 },
        //     );
        // }

        // if (imageFile.type === "image/webp") {
        //     try {
        //         const imageFileName = imageFile?.name.match(/^([^\.]+)/)?.[0] ?? null;

        //         //If the image is already existing in the current folder, no need to upload/overwrite it (but i want to overwrite)
        //         // const existingImage = await cloudinary.api.resource(`${imageConfig.folderName}/${imageFileName}`);
        //         // if (existingImage) {
        //         //     return existingImage;
        //         // }

        //         const arrayBuffer = await imageFile.arrayBuffer();
        //         const bufferImage = new Uint8Array(arrayBuffer);



        //         await new Promise((resolve, reject) => {
        //             cloudinary.uploader.upload_stream({
        //                 // tags: ['GoChat-Dashboard'],              //Uses: Project Screenshots by - await cloudinary.api.resources_by_tag('GoChat-Dashboard',{})
        //                 public_id: imageFileName as string,
        //                 folder: imageConfig?.folderName,
        //                 transformation: [
        //                     {
        //                         quality: 'auto',
        //                         fetch_format: 'webp',
        //                     }, {
        //                         width: imageConfig?.width,
        //                         height: imageConfig?.height,
        //                         crop: 'fill',
        //                         gravity: 'auto',
        //                     }
        //                 ]
        //             }, function (error, result) {
        //                 if (error) {
        //                     reject(error);
        //                     return;
        //                 }
        //                 resolve(result);
        //             }).end(bufferImage);
        //         })

        //         return { "message": "Image Uploaded Successfully!" };

        //     } catch (error) {
        //         console.error("Error Uploading Image: ", error);
        //         return { "errorMessage": "Image Upload Failed!" };
        //     }

        // } else {
        //     return { "errorMessage": "Unsupported Image Type" };
        // }

        const formData = await req.formData();

        const imageFile = formData.get('fileUpload') as File;
        const imageConfigStr = formData.get('imageConfig') as string;
        const imageConfig = JSON.parse(imageConfigStr);

        console.log(imageFile);
        console.log(imageConfig);


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
        // return Response.json(
        //     { successMessage: formData },
        //     { status: 200 }
        // );

    } catch (error) {
        return Response.json(
            { error: "Internal Server Error" },
            { status: 503 },
        );
    }
}