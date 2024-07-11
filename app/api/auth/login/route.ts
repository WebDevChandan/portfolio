import prisma from "@/utils/prisma";
import { NextResponse } from "next/server";
import validator from 'validator';
import * as jose from 'jose';
import bcrypt from 'bcrypt';
import { cookies } from "next/headers";

export async function POST(req: Request) {
    try {
        if (req.method !== "POST") {
            return NextResponse.json(
                { error: "Method Not Allowed" },
                { status: 405 },
            )
        }

        const { email, password } = await req.json();
        const errors: string[] = [];

        const validationSchema = [
            {
                valid: validator.isLength(email, { min: 10 }),
                errorMessage: "Enter Valid Email",
            },
            {
                valid: validator.isLength(password, { min: 6 }),
                errorMessage: "Enter Valid Passowrd",
            },
            {
                valid: validator.isEmail(email),
                errorMessage: "Invalid Email",
            },
            {
                valid: validator.isStrongPassword(password),
                errorMessage: "Invalid Passoword",
            },
        ]

        validationSchema.forEach(check => {
            if (!check.valid)
                errors.push(check.errorMessage);
        })

        if (errors.length)
            return NextResponse.json(
                { errorMessage: errors[0] },
                { status: 401 }
            );

        const admin = await prisma.admin.findUnique({
            where: {
                email,
            },
            select: {
                id: true,
                email: true,
                password: true,
                firstName: true,
                lastName: true,
            }
        })

        if (!admin)
            return NextResponse.json(
                { errorMessage: "Unauthorized Access" },
                { status: 401 }
            )

        const isMatch = await bcrypt.compare(password, admin.password);

        if (!isMatch)
            return NextResponse.json(
                { errorMessage: "Unauthorized Access" },
                { status: 401 }
            )


        const alg = "HS256";

        const secret = new TextEncoder().encode(process.env.JWT_SECRET);

        const token = await new jose.SignJWT({ id: admin.id, firstName: admin.firstName, lastName: admin.lastName, email: admin.email })
            .setProtectedHeader({ alg })
            .setExpirationTime("2h")
            .sign(secret);

        cookies().set("jwt", token, {
            maxAge: 60 * 6 * 2
        });


        return NextResponse.json(
            { admin, message: "Login Successfull" },
            { status: 200 }
        );

    } catch (error) {
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 503 },
        );
    }
}