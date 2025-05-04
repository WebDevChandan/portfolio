"use server";
import authAdmin from "@/utils/firebase-admin";
import { verifyIdToken } from "./auth.action";
import { cookies } from "next/headers";

export async function createSessionCookie(idToken: string, expiresIn: number) {
    try {
        const decodedIdToken = await verifyIdToken(idToken);

        if (!decodedIdToken)
            throw new Error("Failed to decode ID token");

        const { uid, email_verified, auth_time, isAdmin } = decodedIdToken;

        const isRecentLogin = (Date.now() / 1000 - auth_time) < 5 * 60;

        if (uid !== process.env.ADMIN_USER_UID) {
            throw new Error("Unauthorized user UID");
        }

        if (!isAdmin) {
            throw new Error("User not Admin");
        }

        if (!email_verified) {
            throw new Error("Email not verified");
        }

        if (!isRecentLogin) {
            throw new Error("Login too old for session cookie");
        }

        const sessionCookie = await authAdmin.createSessionCookie(idToken, { expiresIn });
        return sessionCookie;

    } catch (error) {
        console.error("createSessionCookie error:", error);
        throw new Error("Failed to create session cookie");
    }
}

export async function revokeAllSession(sessionCookie: string) {
    try {
        const decodedClaims = await verifySessionCookie(sessionCookie);

        await authAdmin.revokeRefreshTokens(decodedClaims.sub).catch((error) => {
            console.log("Error in revokeAllSession: ", error);
            return false;
        });

        return true;

    } catch (error) {
        console.error("revokeSessionCookie error:");
        throw new Error("Invalid session cookie");
    }
}


export async function verifySessionCookie(sessionCookie: string) {
    try {
        const decodedClaims = await authAdmin.verifySessionCookie(sessionCookie, true);

        return decodedClaims;

    } catch (error) {
        console.error("verifySessionCookie error:", error);
        throw new Error("Invalid session cookie");
    }
}

export async function getCookieToken(key: string) {
    const cookieStore = await cookies();
    const cookie = cookieStore.get(key)?.value as string;
    
    if (!cookie) {
        throw new Error("Cookie not found");
    }

    return cookie;
}