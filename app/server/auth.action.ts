"use server";
import authAdmin from "@/utils/firebaseAdmin";

export async function verifyIdToken(idToken: string) {
    try {
        const decodedToken = await authAdmin.verifyIdToken(idToken);
        return decodedToken;

    } catch (error) {
        console.error("verifyIdToken error:", error);
        throw new Error("Invalid ID token");
    };
}