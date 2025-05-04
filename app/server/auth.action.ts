"use server";
import authAdmin from "@/utils/firebase-admin";

export async function verifyIdToken(idToken: string) {
    try {
        const decodedToken = await authAdmin.verifyIdToken(idToken);
        return decodedToken;

    } catch (error) {
        console.error("verifyIdToken error:", error);
        throw new Error("Invalid ID token");
    };
}

export async function verifyCSRFToken(clientCSRFToken: string, serverCSRFToken: string) {
    if ((!clientCSRFToken || !serverCSRFToken) || (clientCSRFToken !== serverCSRFToken))
        return false;
    else
        return true;
}
