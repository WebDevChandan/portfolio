'use server';
import { cookies } from "next/headers";
import jwt from 'jsonwebtoken';

export async function isValidToken() {
    const jwtToken = cookies().get('jwt')?.value as string;

    if (!jwtToken)
        return false;
    
    try {
        jwt.verify(jwtToken, `${process.env.JWT_SECRET}`);

        return true;
    } catch (error: any) {
        console.log("Reached Catch block")
        console.error(error?.message);
        return false;
    }


}