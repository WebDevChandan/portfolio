import prisma from "@/utils/prisma";
import validator from 'validator';
import * as jose from 'jose';
import bcrypt from 'bcrypt';
import { cookies } from "next/headers";
import jwt from 'jsonwebtoken';
import { NextResponse } from "next/server";
import { ProfileType } from "@/app/dashboard/profile/page";
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
});

export async function POST(req: Request) {
    try {
        if (req.method !== "POST") {
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
        })

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


        return Response.json(
            { successMessage: "Photo Updated Successfully" },
            { status: 200 }
        );

    } catch (error) {
        return Response.json(
            { error: "Internal Server Error" },
            { status: 503 },
        );
    }
}