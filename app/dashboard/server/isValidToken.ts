'use server';
import { getCookieToken, verifySessionCookie } from "@/app/server/cookies.action";

export async function isValidToken() {
    const sessionCookie = await getCookieToken('session');

    try {
        const decodedClaims = await verifySessionCookie(sessionCookie);

        if (decodedClaims.uid === process.env.ADMIN_USER_UID && decodedClaims.email_verified && decodedClaims.isAdmin)
            return true;
        else
            return false;

    } catch (error) {
        console.error("Error Token Validation: " + error);
        throw new Error("Invalid session cookie");
    }
}