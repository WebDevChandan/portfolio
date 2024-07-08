import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken';
import prisma from "@/utils/prisma";

export async function GET(req: Request) {
    try {
        const token = req.headers.get("authorization") as string;

        if (!token) {
            return NextResponse.json(
                { error: "Unauthorized Access" },
                { status: 401 },
            );
        }

        try {
            jwt.verify(token, `${process.env.JWT_SECRET}`);

        } catch (error: any) {
            return NextResponse.json(
                { error: error?.message },
                { status: 401 },
            );
        }

        const payload = jwt.decode(token) as { id: string, email: string };

        if (!payload.id || !payload.email)
            return NextResponse.json(
                { error: "Unauthorized Access" },
                { status: 401 },
            );

        const admin = await prisma.admin.findFirst({
            where: {
                id: payload.id,
                email: payload.email,
            },
            select: {
                email: true
            }
        });


        if (!admin)
            return NextResponse.json(
                { error: "Unauthorized Access" },
                { status: 401 }
            )

        return NextResponse.json(
            { data: payload.email },
            { status: 200 }
        );

    } catch (error) {
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 503 },
        );
    }
}