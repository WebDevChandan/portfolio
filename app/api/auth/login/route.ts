import prisma from "@/utils/prisma";
import validator from 'validator';
import * as jose from 'jose';
import bcrypt from 'bcrypt';
import { cookies } from "next/headers";
import jwt from 'jsonwebtoken';

export async function POST(req: Request) {
    try {
        if (req.method === "POST") {
            const { email, password } = await req.json();
            const errors: string[] = [];

            const validationSchema = [
                {
                    valid: validator.isLength(email, { min: 10 }),
                    errorMessage: "Enter Valid Email",
                },
                {
                    valid: validator.isStrongPassword(password),
                    errorMessage: "Enter Valid Password",
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
                return Response.json(
                    { errorMessage: errors[0] },
                    { status: 401 }
                );

            try {
                const token = cookies().get("jwt")?.value as string;

                if (token) {
                    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { email: string };

                    if (decoded.email === email)
                        return Response.json(
                            { errorMessage: "Already Logged In!" },
                            { status: 409 }
                        );
                }

            } catch (error: any) {
                cookies().delete("jwt");
                return Response.json(
                    { errorMessage: error.message },
                    { status: 401 }
                );
            }

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
                return Response.json(
                    { errorMessage: "Unauthorized Access!" },
                    { status: 401 }
                )

            const isMatch = await bcrypt.compare(password, admin.password);

            if (!isMatch)
                return Response.json(
                    { errorMessage: "Unauthorized Access!" },
                    { status: 401 }
                )


            const alg = "HS256";

            const secret = new TextEncoder().encode(process.env.JWT_SECRET);

            const token = await new jose.SignJWT({ id: admin.id, firstName: admin.firstName, lastName: admin.lastName, email: admin.email })
                .setProtectedHeader({ alg })
                .setExpirationTime("2h")
                .sign(secret);

            cookies().set("jwt", token, {
                maxAge: 60 * 60 * 2,
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                path: "/",
                sameSite: "lax",
            });

            return Response.json(
                { admin: { firstName: admin.firstName, lastName: admin.lastName, email: admin.email }, successMessage: "Login Successfull" },
                { status: 200 }
            );
        }

    } catch (error) {
        return Response.json(
            { error: "Internal Server Error" },
            { status: 503 },
        );
    }
}