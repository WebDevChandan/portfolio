import prisma from "@/utils/prisma";
import validator from 'validator';
import * as jose from 'jose';
import bcrypt from 'bcrypt';
import { cookies } from "next/headers";
import jwt from 'jsonwebtoken';
import { NextResponse } from "next/server";
import { ProfileType } from "@/app/dashboard/profile/page";

export async function PUT(req: Request) {
    try {
        if (req.method !== "PUT") {
            return Response.json(
                { error: "Method Not Allowed" },
                { status: 405 },
            )
        }

        const token = req.headers.get("authorization") as string;

        if (!token) {
            return NextResponse.json(
                { errorMessage: "Unauthorized Access" },
                { status: 401 },
            );
        }

        try {
            jwt.verify(token, `${process.env.JWT_SECRET}`);

        } catch (error: any) {
            return NextResponse.json(
                { errorMessage: error?.message },
                { status: 401 },
            );
        }

        const updatedProfileData = await req.json() as ProfileType;

        await prisma.personalInfo.updateMany({
            data: {
                ...updatedProfileData
            }
        })


        return Response.json(
            // { admin: { firstName: admin.firstName, lastName: admin.lastName, email: admin.email }, successMessage: "Login Successfull" },
            { successMessage: "Profile Updated Successfully" },
            { status: 200 }
        );

    } catch (error) {
        return Response.json(
            { error: "Internal Server Error" },
            { status: 503 },
        );
    }
}